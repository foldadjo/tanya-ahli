import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'tanya-ahli';

console.log('MONGODB_URI from env:', MONGODB_URI);

export async function POST(request: Request) {
  try {
    console.log('POST request received');
    const { action, data } = await request.json();
    console.log('Action:', action, 'Data:', data);
    
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    
    const db = client.db(DB_NAME);
    console.log('Using database:', DB_NAME);

    switch (action) {
      case 'recordVisit':
        const { visitorId } = data;
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        console.log('Recording visit for:', { visitorId, today });

        const visitors = db.collection('daily_visitors');
        const existingVisit = await visitors.findOne({
          date: today,
          visitorId: visitorId
        });
        console.log('Existing visit:', existingVisit);

        if (!existingVisit) {
          await visitors.insertOne({
            date: today,
            visitorId: visitorId,
            lastVisit: now,
            startVisit: now,
          });
          console.log('New visit recorded');
        } else {
          await visitors.updateOne(
            { _id: existingVisit._id },
            { $set: { lastVisit: now } }
          );
          console.log('Visit updated');
        }
        break;

      case 'recordExpertQuestion':
        const { category } = data;
        console.log('Recording expert question for category:', category);
        
        const experts = db.collection('analytic');
        await experts.updateOne(
          { category },
          { 
            $inc: { questionCount: 1 },
            $set: { lastUpdated: new Date() }
          },
          { upsert: true }
        );
        console.log('Expert question recorded');
        break;
    }

    await client.close();
    console.log('MongoDB connection closed');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    console.log('GET request received');
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    console.log('Action:', action);

    const client = await MongoClient.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    
    const db = client.db(DB_NAME);
    console.log('Using database:', DB_NAME);

    let result;
    switch (action) {
      case 'dailyVisitors':
        console.log('Fetching daily visitors');
        const visitors = db.collection('daily_visitors');
        result = await visitors.aggregate([
          {
            $group: {
              _id: '$date',
              count: { $sum: 1 }
            }
          },
          {
            $sort: { _id: -1 }
          },
          {
            $project: {
              _id: 0,
              date: '$_id',
              count: 1
            }
          }
        ]).toArray();
        console.log('Daily visitors result:', result);
        break;

      case 'expertStats':
        console.log('Fetching expert stats');
        const experts = db.collection('analytic');
        result = await experts.find()
          .sort({ questionCount: -1 })
          .project({ _id: 0, category: 1, questionCount: 1 })
          .toArray();
        console.log('Expert stats result:', result);
        break;

      default:
        console.log('Invalid action:', action);
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await client.close();
    console.log('MongoDB connection closed');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 