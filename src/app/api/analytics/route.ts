import { NextResponse } from 'next/server';
import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'tanya-ahli';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export async function POST(request: Request) {
  try {
    const { action, data } = await request.json();
    const { db } = await connectToDatabase();

    switch (action) {
      case 'recordVisit': {
        const { visitorId } = data;
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const visitors = db.collection('daily_visitors');
        const existingVisit = await visitors.findOne({ date: today, visitorId });
        if (!existingVisit) {
          await visitors.insertOne({ date: today, visitorId, lastVisit: now, startVisit: now });
        } else {
          await visitors.updateOne({ _id: existingVisit._id }, { $set: { lastVisit: now } });
        }
        break;
      }
      case 'recordExpertQuestion': {
        const { category } = data;
        const experts = db.collection('analytic');
        await experts.updateOne(
          { category },
          { $inc: { questionCount: 1 }, $set: { lastUpdated: new Date() } },
          { upsert: true }
        );
        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const { db } = await connectToDatabase();

    let result;
    switch (action) {
      case 'dailyVisitors': {
        const visitors = db.collection('daily_visitors');
        result = await visitors.aggregate([
          { $group: { _id: '$date', count: { $sum: 1 } } },
          { $sort: { _id: -1 } },
          { $project: { _id: 0, date: '$_id', count: 1 } }
        ]).toArray();
        break;
      }
      case 'expertStats': {
        const experts = db.collection('analytic');
        result = await experts.find()
          .sort({ questionCount: -1 })
          .project({ _id: 0, category: 1, questionCount: 1 })
          .toArray();
        break;
      }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
