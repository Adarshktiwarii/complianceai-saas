import { NextRequest, NextResponse } from 'next/server';
import { generateSimpleAIResponse } from '@/lib/ai-simple';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Use simple AI response
    const aiResponse = generateSimpleAIResponse(message);

    return NextResponse.json({
      success: true,
      response: aiResponse.response,
      suggestions: aiResponse.suggestions,
      source: aiResponse.source
    });

  } catch (error) {
    console.error('AI Test error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
