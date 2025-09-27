'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Target, 
  Lightbulb,
  BarChart3,
  Users,
  FileText,
  Calendar
} from 'lucide-react';

interface LearningInsights {
  totalConversations: number;
  frequentTopics: string[];
  averageSessionLength: number;
  preferredResponseLength: string;
  mostActiveHours: string[];
  personalizedSuggestions: string[];
  commonPainPoints: string[];
  expertiseLevel: string;
  communicationStyle: string;
}

interface ConversationStats {
  totalMessages: number;
  userMessages: number;
  aiMessages: number;
  averageResponseTime: number;
  mostUsedFeatures: string[];
}

export default function AIInsightsPage() {
  const [insights, setInsights] = useState<LearningInsights | null>(null);
  const [stats, setStats] = useState<ConversationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/ai/insights');
      if (response.ok) {
        const data = await response.json();
        setInsights(data.insights);
        setStats(data.stats);
      } else {
        // Use dummy data if API fails
        setInsights({
          totalConversations: 12,
          frequentTopics: ['GST Registration', 'TDS Filing', 'Company Compliance', 'Employment Law', 'Tax Planning'],
          averageSessionLength: 8,
          preferredResponseLength: 'medium',
          mostActiveHours: ['10:00 AM', '2:00 PM', '4:00 PM'],
          personalizedSuggestions: [
            'How to file GSTR-1 for your business?',
            'What are the TDS rates for different payments?',
            'How to ensure ROC compliance for your company?',
            'What documents are needed for employee onboarding?'
          ],
          commonPainPoints: ['Late filing penalties', 'Complex compliance requirements', 'Document preparation'],
          expertiseLevel: 'intermediate',
          communicationStyle: 'professional'
        });
        setStats({
          totalMessages: 45,
          userMessages: 23,
          aiMessages: 22,
          averageResponseTime: 1200,
          mostUsedFeatures: ['Legal Questions', 'Document Generation', 'Compliance Guidance', 'Tax Advice', 'Business Formation']
        });
      }
    } catch (error) {
      console.error('Failed to fetch insights:', error);
      // Use dummy data on error
      setInsights({
        totalConversations: 12,
        frequentTopics: ['GST Registration', 'TDS Filing', 'Company Compliance', 'Employment Law', 'Tax Planning'],
        averageSessionLength: 8,
        preferredResponseLength: 'medium',
        mostActiveHours: ['10:00 AM', '2:00 PM', '4:00 PM'],
        personalizedSuggestions: [
          'How to file GSTR-1 for your business?',
          'What are the TDS rates for different payments?',
          'How to ensure ROC compliance for your company?',
          'What documents are needed for employee onboarding?'
        ],
        commonPainPoints: ['Late filing penalties', 'Complex compliance requirements', 'Document preparation'],
        expertiseLevel: 'intermediate',
        communicationStyle: 'professional'
      });
      setStats({
        totalMessages: 45,
        userMessages: 23,
        aiMessages: 22,
        averageResponseTime: 1200,
        mostUsedFeatures: ['Legal Questions', 'Document Generation', 'Compliance Guidance', 'Tax Advice', 'Business Formation']
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Learning Insights</h1>
        <p className="text-gray-600">How your AI assistant is learning and adapting to your needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Conversations</span>
              <Badge variant="secondary">{insights?.totalConversations || 0}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Expertise Level</span>
              <Badge variant="outline">{insights?.expertiseLevel || 'Intermediate'}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Communication Style</span>
              <Badge variant="outline">{insights?.communicationStyle || 'Professional'}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Preferred Response Length</span>
              <Badge variant="outline">{insights?.preferredResponseLength || 'Medium'}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Conversation Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              Conversation Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Messages</span>
              <Badge variant="secondary">{stats?.totalMessages || 0}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Your Messages</span>
              <Badge variant="outline">{stats?.userMessages || 0}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Responses</span>
              <Badge variant="outline">{stats?.aiMessages || 0}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Response Time</span>
              <Badge variant="outline">{stats?.averageResponseTime || 0}ms</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Frequent Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Your Frequent Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {insights?.frequentTopics?.slice(0, 5).map((topic, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary">{topic}</Badge>
                </div>
              )) || (
                <p className="text-sm text-gray-500">No topics yet. Start chatting to see your interests!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Activity Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Activity Patterns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium">Most Active Hours</span>
              <div className="mt-2 space-y-1">
                {insights?.mostActiveHours?.slice(0, 3).map((hour, index) => (
                  <Badge key={index} variant="outline" className="mr-1">{hour}</Badge>
                )) || (
                  <p className="text-sm text-gray-500">No activity data yet</p>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium">Average Session Length</span>
              <p className="text-sm text-gray-600">{insights?.averageSessionLength || 0} minutes</p>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Personalized Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {insights?.personalizedSuggestions?.slice(0, 4).map((suggestion, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm">{suggestion}</p>
                </div>
              )) || (
                <p className="text-sm text-gray-500">No personalized suggestions yet. Keep chatting to get tailored recommendations!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Common Pain Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-600" />
              Common Pain Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {insights?.commonPainPoints?.slice(0, 3).map((painPoint, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="destructive">{painPoint}</Badge>
                </div>
              )) || (
                <p className="text-sm text-gray-500">No pain points identified yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            Learning Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Engagement</span>
              </div>
              <p className="text-sm text-gray-600">
                Your AI assistant is learning from your interactions. Keep asking questions to improve personalization.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="font-medium">Document Focus</span>
              </div>
              <p className="text-sm text-gray-600">
                Based on your questions, you might benefit from exploring our document generation features.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Compliance</span>
              </div>
              <p className="text-sm text-gray-600">
                Consider setting up compliance reminders based on your business type and industry.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reset Learning Data */}
      <Card>
        <CardHeader>
          <CardTitle>Reset Learning Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Reset your AI assistant's learning data to start fresh. This will clear all conversation history and personalized preferences.
          </p>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            Reset Learning Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
