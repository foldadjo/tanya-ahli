import { GoogleGenerativeAI } from '@google/generative-ai';
import { ExpertCategory } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function generateAnswer(category: ExpertCategory, question: string): Promise<string> {
  try {
    console.log("API Key:", process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `You are an expert ${category}. Please provide a detailed and professional answer to the following question: ${question}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating answer:', error);
    throw new Error('Failed to generate answer');
  }
} 