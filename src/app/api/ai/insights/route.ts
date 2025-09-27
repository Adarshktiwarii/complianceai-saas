import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AIMemory } from '@/lib/ai-memory';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await verifySession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's company information
    const company = await db.company.findFirst({
      where: { userId: session.userId }
    });

    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      );
    }

    // Initialize AI Memory system
    const aiMemory = new AIMemory(session.userId, company.id, 'insights');

    // Get learning data
    const learningData = await db.aiLearningData.findUnique({
      where: { userId: session.userId }
    });

    // Get conversation statistics
    const conversationStats = await db.conversationMessage.aggregate({
      where: { userId: session.userId },
      _count: { id: true },
      _avg: { timestamp: true }
    });

    const userMessages = await db.conversationMessage.count({
      where: { 
        userId: session.userId,
        role: 'user'
      }
    });

    const aiMessages = await db.conversationMessage.count({
      where: { 
        userId: session.userId,
        role: 'assistant'
      }
    });

    // Get AI interactions for response time
    const aiInteractions = await db.aiInteraction.findMany({
      where: { companyId: company.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const averageResponseTime = aiInteractions.length > 0 
      ? aiInteractions.reduce((sum, interaction) => sum + (interaction.tokensUsed || 0), 0) / aiInteractions.length
      : 0;

    // Get most used features based on conversation topics
    const mostUsedFeatures = learningData?.preferredTopics?.slice(0, 5) || [];

    // Build insights
    const insights = {
      totalConversations: learningData?.frequentQuestions?.length || 0,
      frequentTopics: learningData?.preferredTopics || [],
      averageSessionLength: learningData?.averageSessionLength || 0,
      preferredResponseLength: learningData?.preferredResponseLength || 'medium',
      mostActiveHours: learningData?.mostActiveHours || [],
      personalizedSuggestions: learningData?.personalizedSuggestions || [],
      commonPainPoints: learningData?.commonPainPoints || [],
      expertiseLevel: learningData?.preferredResponseLength === 'short' ? 'beginner' : 
                     learningData?.preferredResponseLength === 'long' ? 'expert' : 'intermediate',
      communicationStyle: learningData?.preferredResponseLength === 'short' ? 'casual' : 'professional'
    };

    const stats = {
      totalMessages: conversationStats._count.id || 0,
      userMessages,
      aiMessages,
      averageResponseTime: Math.round(averageResponseTime),
      mostUsedFeatures
    };

    return NextResponse.json({
      success: true,
      insights,
      stats
    });

  } catch (error) {
    console.error('AI Insights error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await verifySession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Delete all learning data for the user
    await db.aiLearningData.deleteMany({
      where: { userId: session.userId }
    });

    await db.conversationMessage.deleteMany({
      where: { userId: session.userId }
    });

    return NextResponse.json({
      success: true,
      message: 'Learning data reset successfully'
    });

  } catch (error) {
    console.error('Reset learning data error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset learning data' },
      { status: 500 }
    );
  }
}
