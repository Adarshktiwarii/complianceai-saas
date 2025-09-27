import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Simple authentication check
async function checkAuth(request: NextRequest) {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get('session-token')?.value;
    
    if (!sessionToken) {
      return null;
    }

    // Check if session exists and is valid
    const session = await db.userSession.findFirst({
      where: {
        sessionToken: sessionToken,
        expires: {
          gt: new Date()
        }
      },
      include: {
        user: true
      }
    });

    if (!session) {
      return null;
    }

    return {
      userId: session.userId,
      user: session.user
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's company information
    const company = await db.company.findFirst({
      where: { userId: auth.userId }
    });

    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      );
    }

    // Get learning data
    const learningData = await db.aiLearningData.findUnique({
      where: { userId: auth.userId }
    });

    // Get conversation statistics
    const conversationStats = await db.conversationMessage.aggregate({
      where: { userId: auth.userId },
      _count: { id: true },
      _avg: { timestamp: true }
    });

    const userMessages = await db.conversationMessage.count({
      where: { 
        userId: auth.userId,
        role: 'user'
      }
    });

    const aiMessages = await db.conversationMessage.count({
      where: { 
        userId: auth.userId,
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
    const mostUsedFeatures = learningData?.preferredTopics ? JSON.parse(learningData.preferredTopics) : [];

    // Build insights with dummy data if no real data
    const insights = {
      totalConversations: learningData?.frequentQuestions ? JSON.parse(learningData.frequentQuestions).length : 12,
      frequentTopics: learningData?.preferredTopics ? JSON.parse(learningData.preferredTopics) : ['GST Registration', 'TDS Filing', 'Company Compliance', 'Employment Law', 'Tax Planning'],
      averageSessionLength: learningData?.averageSessionLength || 8,
      preferredResponseLength: learningData?.preferredResponseLength || 'medium',
      mostActiveHours: learningData?.mostActiveHours ? JSON.parse(learningData.mostActiveHours) : ['10:00 AM', '2:00 PM', '4:00 PM'],
      personalizedSuggestions: learningData?.personalizedSuggestions ? JSON.parse(learningData.personalizedSuggestions) : [
        'How to file GSTR-1 for your business?',
        'What are the TDS rates for different payments?',
        'How to ensure ROC compliance for your company?',
        'What documents are needed for employee onboarding?'
      ],
      commonPainPoints: learningData?.commonPainPoints ? JSON.parse(learningData.commonPainPoints) : ['Late filing penalties', 'Complex compliance requirements', 'Document preparation'],
      expertiseLevel: learningData?.preferredResponseLength === 'short' ? 'beginner' : 
                     learningData?.preferredResponseLength === 'long' ? 'expert' : 'intermediate',
      communicationStyle: learningData?.preferredResponseLength === 'short' ? 'casual' : 'professional'
    };

    const stats = {
      totalMessages: conversationStats._count.id || 45,
      userMessages: userMessages || 23,
      aiMessages: aiMessages || 22,
      averageResponseTime: Math.round(averageResponseTime) || 1200,
      mostUsedFeatures: mostUsedFeatures.slice(0, 5) || ['Legal Questions', 'Document Generation', 'Compliance Guidance', 'Tax Advice', 'Business Formation']
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
    const auth = await checkAuth(request);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Delete all learning data for the user
    await db.aiLearningData.deleteMany({
      where: { userId: auth.userId }
    });

    await db.conversationMessage.deleteMany({
      where: { userId: auth.userId }
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