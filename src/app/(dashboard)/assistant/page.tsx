'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, FileText, AlertCircle, CheckCircle, Clock, Lightbulb } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
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
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        suggestions: getSuggestions(inputMessage)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('gst') && lowerQuestion.includes('registration')) {
      return `For GST registration in India, you need the following documents:

**Required Documents:**
• PAN Card of the business
• Aadhaar Card of the authorized signatory
• Proof of business registration (Certificate of Incorporation)
• Bank account details
• Business address proof
• Digital signature certificate
• Photographs of authorized signatory

**Additional Documents:**
• Partnership deed (for partnership firms)
• Memorandum of Association (for companies)
• Articles of Association (for companies)

The registration process typically takes 3-7 working days. Would you like me to help you with the specific registration process for your business type?`;
    }
    
    if (lowerQuestion.includes('tds') && lowerQuestion.includes('return')) {
      return `TDS (Tax Deducted at Source) returns must be filed quarterly. Here's what you need to know:

**Filing Deadlines:**
• Q1 (April-June): July 31st
• Q2 (July-September): October 31st  
• Q3 (October-December): January 31st
• Q4 (January-March): May 31st

**Required Forms:**
• Form 24Q: For salary payments
• Form 26Q: For non-salary payments
• Form 27Q: For payments to non-residents

**Penalties for Late Filing:**
• ₹200 per day of delay
• Interest on late payment: 1.5% per month

Would you like me to help you prepare the TDS return for your specific case?`;
    }
    
    if (lowerQuestion.includes('compliance') && lowerQuestion.includes('startup')) {
      return `Here are the key compliance requirements for Indian startups:

**Monthly Compliance:**
• TDS returns (if applicable)
• Professional tax (state-wise)
• ESI and PF returns (if employees > 20)

**Quarterly Compliance:**
• GST returns (GSTR-1, GSTR-3B)
• TDS returns
• ROC compliance (for companies)

**Annual Compliance:**
• Income tax returns
• Annual ROC filings
• Audit reports (if turnover > ₹1 crore)
• AGM (Annual General Meeting)

**Startup-Specific Benefits:**
• 3-year tax holiday (if eligible)
• Fast-track patent examination
• Self-certification for labor laws

Would you like me to create a compliance calendar for your startup?`;
    }
    
    if (lowerQuestion.includes('employment') && lowerQuestion.includes('agreement')) {
      return `I can help you generate an employment agreement. Here's what should be included:

**Essential Clauses:**
• Job title and description
• Salary and benefits
• Working hours and location
• Probation period
• Notice period for termination
• Confidentiality and non-compete clauses
• Intellectual property rights
• Dispute resolution mechanism

**Legal Requirements:**
• Minimum wage compliance
• Statutory benefits (PF, ESI, etc.)
• Leave entitlements
• Termination procedures

Would you like me to generate a customized employment agreement for your specific requirements?`;
    }
    
    if (lowerQuestion.includes('penalty') && lowerQuestion.includes('gst')) {
      return `GST late filing penalties are as follows:

**Late Fee Structure:**
• ₹200 per day (₹100 for CGST + ₹100 for SGST)
• Maximum penalty: ₹10,000 per return
• Interest: 18% per annum on tax amount

**Interest Calculation:**
• From due date to actual payment date
• On the tax amount due
• Compounded monthly

**Relief Available:**
• Amnesty schemes (periodic)
• Waiver of late fees (conditional)
• Reduced penalties for first-time defaulters

**Best Practices:**
• Set up automated reminders
• Use GST software for filing
• Maintain proper documentation

Would you like me to help you calculate the exact penalty for your case?`;
    }
    
    if (lowerQuestion.includes('register') && lowerQuestion.includes('company')) {
      return `Company registration in India involves several steps:

**Types of Companies:**
• Private Limited Company (most popular for startups)
• Public Limited Company
• One Person Company (OPC)
• Limited Liability Partnership (LLP)

**Registration Process:**
1. **Name Approval:** Check name availability on MCA portal
2. **Digital Signature:** Obtain DSC for directors
3. **Director Identification Number:** Apply for DIN
4. **Incorporation Documents:** Prepare MOA, AOA, etc.
5. **Filing:** Submit forms with ROC
6. **Certificate:** Receive Certificate of Incorporation

**Required Documents:**
• PAN and Aadhaar of directors
• Address proof of registered office
• MOA and AOA
• Declaration by subscribers

**Timeline:** 7-15 days (if all documents are correct)

Would you like me to guide you through the specific registration process for your business type?`;
    }
    
    return `I understand you're asking about "${question}". As your AI Legal Assistant, I can help you with:

• **Document Generation:** Employment agreements, NDAs, contracts
• **Compliance Guidance:** GST, TDS, ROC filings
• **Legal Advice:** Indian business law, startup regulations
• **Risk Assessment:** Legal risks and mitigation strategies

Could you please provide more specific details about your legal question? I'll give you a comprehensive answer tailored to your situation.`;
  };

  const getSuggestions = (question: string): string[] => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('gst')) {
      return [
        "How to file GSTR-1?",
        "What is the GST rate for my product?",
        "How to claim GST input credit?"
      ];
    }
    
    if (lowerQuestion.includes('tds')) {
      return [
        "TDS rates for different payments",
        "How to generate TDS certificate?",
        "TDS return filing process"
      ];
    }
    
    return [
      "Tell me more about this",
      "What are the legal requirements?",
      "Generate a document for this"
    ];
  };

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
