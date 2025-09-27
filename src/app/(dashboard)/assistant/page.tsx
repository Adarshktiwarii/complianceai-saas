'use client';

import { useState, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Lightbulb, 
  Brain, 
  History, 
  Settings, 
  BarChart3,
  MessageSquare,
  Sparkles,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  source?: string;
}

export default function LegalAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI Legal Assistant. I can help you with Indian legal compliance, document generation, and legal questions. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        'What documents do I need for GST registration?',
        'How to file TDS returns?',
        'What are the compliance requirements for a startup?',
        'Generate an employment agreement template'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}`);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState<string[]>([]);

  // Load personalized suggestions on component mount
  useEffect(() => {
    loadPersonalizedSuggestions();
  }, []);

  const loadPersonalizedSuggestions = async () => {
    try {
      const response = await fetch('/api/ai/insights');
      if (response.ok) {
        const data = await response.json();
        setPersonalizedSuggestions(data.insights?.personalizedSuggestions || []);
      }
    } catch (error) {
      console.error('Failed to load personalized suggestions:', error);
    }
  };

  const quickQuestions = [
    {
      question: "What documents do I need for GST registration?",
      category: "GST",
      icon: FileText,
      color: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      question: "How to file TDS returns?",
      category: "Tax",
      icon: Clock,
      color: "bg-green-50 border-green-200 text-green-800"
    },
    {
      question: "What are the compliance requirements for a startup?",
      category: "Compliance",
      icon: CheckCircle,
      color: "bg-purple-50 border-purple-200 text-purple-800"
    },
    {
      question: "Generate an employment agreement template",
      category: "Documents",
      icon: FileText,
      color: "bg-orange-50 border-orange-200 text-orange-800"
    },
    {
      question: "What is the penalty for late GST filing?",
      category: "Penalties",
      icon: AlertCircle,
      color: "bg-red-50 border-red-200 text-red-800"
    },
    {
      question: "How to register a company in India?",
      category: "Registration",
      icon: Target,
      color: "bg-indigo-50 border-indigo-200 text-indigo-800"
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Call AI API (using test endpoint for now)
      const response = await fetch('/api/ai/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify({
          message: currentMessage,
          context: {
            timestamp: new Date().toISOString(),
            sessionId: sessionId
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const aiResponse: ChatMessage = {
          id: `ai_${Date.now()}`,
          type: 'assistant',
          content: data.response,
          timestamp: new Date(),
          suggestions: data.suggestions || [],
          source: data.source || 'api'
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        // Fallback response
        const fallbackResponse: ChatMessage = {
          id: `ai_${Date.now()}`,
          type: 'assistant',
          content: "I'm experiencing technical difficulties. Please try again later or contact support if the issue persists.",
          timestamp: new Date(),
          suggestions: ["Try again", "Contact support", "Browse our help center"]
        };
        setMessages(prev => [...prev, fallbackResponse]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorResponse: ChatMessage = {
        id: `ai_${Date.now()}`,
        type: 'assistant',
        content: "I'm experiencing technical difficulties. Please try again later or contact support if the issue persists.",
        timestamp: new Date(),
        suggestions: ["Try again", "Contact support", "Browse our help center"]
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Legal Assistant</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your intelligent legal companion for Indian business compliance, document generation, and legal guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5" />
                  Legal Assistant Chat
                  <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900 border'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {message.source && (
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {message.source === 'openai' ? '🤖 OpenAI GPT-4' : 
                               message.source === 'perplexity' ? '🔍 Perplexity AI' :
                               message.source === 'huggingface' ? '🤗 Hugging Face' :
                               message.source === 'free-api' ? '🆓 Free AI' : 
                               '💬 AI Assistant'}
                            </Badge>
                          </div>
                        )}
                        
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                className="block text-xs text-blue-600 hover:text-blue-800 underline text-left"
                                onClick={() => handleQuickQuestion(suggestion)}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-4 rounded-2xl border">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t bg-gray-50/50">
                  <div className="flex gap-3">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask your legal question..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights Link */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-6">
                <Link href="/assistant/insights">
                  <Button variant="outline" className="w-full bg-white/80 hover:bg-white border-purple-300 text-purple-700">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View AI Insights
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Personalized Suggestions */}
            {personalizedSuggestions.length > 0 && (
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-green-800 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Personalized for You
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {personalizedSuggestions.slice(0, 3).map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-3 rounded-lg bg-white/60 hover:bg-white border border-green-200 text-sm text-green-800 transition-colors"
                        onClick={() => handleQuickQuestion(suggestion)}
                      >
                        <Lightbulb className="h-3 w-3 inline mr-2" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Questions */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {quickQuestions.map((q, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 rounded-lg border hover:shadow-md transition-all duration-200"
                      onClick={() => handleQuickQuestion(q.question)}
                    >
                      <div className="flex items-start space-x-3">
                        <q.icon className="h-4 w-4 mt-1 text-gray-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{q.question}</p>
                          <Badge variant="secondary" className="text-xs mt-1 bg-gray-100 text-gray-600">
                            {q.category}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/60">
                  <FileText className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">Document Generation</p>
                    <p className="text-xs text-gray-600">AI-powered legal documents</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/60">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">Compliance Alerts</p>
                    <p className="text-xs text-gray-600">Smart deadline reminders</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/60">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">Risk Assessment</p>
                    <p className="text-xs text-gray-600">Legal risk analysis</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/60">
                  <Lightbulb className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">Smart Suggestions</p>
                    <p className="text-xs text-gray-600">Personalized recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning & Insights */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-indigo-800 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/60">
                  <Brain className="h-4 w-4 text-indigo-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">Personalized AI</p>
                    <p className="text-xs text-gray-600">Learns from your interactions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/60">
                  <History className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">Conversation Memory</p>
                    <p className="text-xs text-gray-600">Remembers your preferences</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/60">
                  <Settings className="h-4 w-4 text-teal-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-800">Adaptive Responses</p>
                    <p className="text-xs text-gray-600">Tailored to your business</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
}