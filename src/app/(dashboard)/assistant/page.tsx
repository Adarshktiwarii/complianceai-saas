'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, FileText, AlertCircle, CheckCircle, Clock, Lightbulb, Brain, History, Settings, BarChart3 } from 'lucide-react';
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
        "What documents do I need for GST registration?",
        "How to file TDS returns?",
        "What are the compliance requirements for a startup?",
        "Generate an employment agreement template"
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
      icon: FileText
    },
    {
      question: "How to file TDS returns?",
      category: "Tax",
      icon: AlertCircle
    },
    {
      question: "What are the compliance requirements for a startup?",
      category: "Compliance",
      icon: CheckCircle
    },
    {
      question: "Generate an employment agreement template",
      category: "Documents",
      icon: FileText
    },
    {
      question: "What is the penalty for late GST filing?",
      category: "Penalties",
      icon: AlertCircle
    },
    {
      question: "How to register a company in India?",
      category: "Registration",
      icon: Clock
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call real AI API
      const response = await fetch('/api/ai/chat', {
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
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.response,
          timestamp: new Date(),
          suggestions: data.suggestions || [],
          source: data.source || 'api'
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        // Fallback response
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.",
          timestamp: new Date(),
          suggestions: [
            "Try asking again",
            "What can you help me with?",
            "Tell me about legal compliance"
          ]
        };
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('AI Chat error:', error);
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm experiencing technical difficulties. Please try again later or contact support if the issue persists.",
        timestamp: new Date(),
        suggestions: [
          "Try again",
          "Contact support",
          "Browse our help center"
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  // Removed mock functions - now using real AI API

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Legal AI Assistant</h1>
        <p className="text-gray-600">Get instant legal guidance and document generation help</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-600" />
                AI Legal Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.source && (
                        <div className="mt-1">
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
                        <div className="mt-2 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              className="block text-xs text-blue-600 hover:text-blue-800 underline"
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
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask your legal question..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Link */}
        <div className="mb-6">
          <Link href="/assistant/insights">
            <Button variant="outline" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              View AI Learning Insights
            </Button>
          </Link>
        </div>

        {/* Quick Questions & Features */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(item.question)}
                  className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <item.icon className="h-4 w-4 mt-1 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{item.question}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Document Generation</p>
                  <p className="text-xs text-gray-600">AI-powered legal documents</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Compliance Alerts</p>
                  <p className="text-xs text-gray-600">Smart deadline reminders</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Risk Assessment</p>
                  <p className="text-xs text-gray-600">Legal risk analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Lightbulb className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Smart Suggestions</p>
                  <p className="text-xs text-gray-600">Personalized recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
