// AI Memory and Personalization System
// Stores conversation history and learns from user interactions

import { db } from './db';

export interface ConversationMemory {
  id: string;
  userId: string;
  companyId: string;
  sessionId: string;
  messages: ConversationMessage[];
  userPreferences: UserPreferences;
  learningData: LearningData;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    aiSource?: string;
    tokensUsed?: number;
    responseTime?: number;
    userSatisfaction?: number;
  };
}

export interface UserPreferences {
  preferredLanguage: string;
  businessType: string;
  industry: string;
  complianceFocus: string[];
  communicationStyle: 'formal' | 'casual' | 'technical';
  expertiseLevel: 'beginner' | 'intermediate' | 'expert';
  timezone: string;
  workingHours: string;
}

export interface LearningData {
  frequentQuestions: string[];
  preferredTopics: string[];
  userBehavior: {
    averageSessionLength: number;
    preferredResponseLength: 'short' | 'medium' | 'long';
    mostActiveHours: string[];
    commonPainPoints: string[];
  };
  personalizedSuggestions: string[];
  customTemplates: any[];
}

export class AIMemory {
  private userId: string;
  private companyId: string;
  private sessionId: string;

  constructor(userId: string, companyId: string, sessionId: string) {
    this.userId = userId;
    this.companyId = companyId;
    this.sessionId = sessionId;
  }

  // Store conversation message
  async storeMessage(message: ConversationMessage): Promise<void> {
    try {
      await db.conversationMessage.create({
        data: {
          id: message.id,
          userId: this.userId,
          companyId: this.companyId,
          sessionId: this.sessionId,
          role: message.role,
          content: message.content,
          timestamp: message.timestamp,
          metadata: message.metadata ? JSON.stringify(message.metadata) : null
        }
      });
    } catch (error) {
      console.error('Failed to store conversation message:', error);
    }
  }

  // Get conversation history
  async getConversationHistory(limit: number = 20): Promise<ConversationMessage[]> {
    try {
      const messages = await db.conversationMessage.findMany({
        where: {
          userId: this.userId,
          companyId: this.companyId
        },
        orderBy: { timestamp: 'desc' },
        take: limit
      });

      return messages.map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        timestamp: msg.timestamp,
        metadata: msg.metadata ? JSON.parse(msg.metadata) : undefined
      }));
    } catch (error) {
      console.error('Failed to get conversation history:', error);
      return [];
    }
  }

  // Get user preferences
  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const user = await db.user.findUnique({
        where: { id: this.userId },
        include: { companies: true }
      });

      if (!user) {
        return this.getDefaultPreferences();
      }

      const company = user.companies[0];
      
      return {
        preferredLanguage: 'en',
        businessType: company?.companyType || 'Private Limited',
        industry: company?.industry || 'Technology',
        complianceFocus: ['GST', 'TDS', 'ROC'],
        communicationStyle: 'professional',
        expertiseLevel: 'intermediate',
        timezone: 'Asia/Kolkata',
        workingHours: '9:00 AM - 6:00 PM'
      };
    } catch (error) {
      console.error('Failed to get user preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  // Update user preferences based on interactions
  async updateUserPreferences(interaction: ConversationMessage): Promise<void> {
    try {
      // Analyze user message for preferences
      const preferences = await this.analyzeUserPreferences(interaction.content);
      
      // Store learning data
      await this.storeLearningData(interaction);
      
      // Update personalized suggestions
      await this.updatePersonalizedSuggestions(interaction);
    } catch (error) {
      console.error('Failed to update user preferences:', error);
    }
  }

  // Analyze user message for preferences
  private async analyzeUserPreferences(content: string): Promise<Partial<UserPreferences>> {
    const preferences: Partial<UserPreferences> = {};
    
    // Analyze communication style
    if (content.includes('please') || content.includes('thank you')) {
      preferences.communicationStyle = 'formal';
    } else if (content.includes('hey') || content.includes('cool')) {
      preferences.communicationStyle = 'casual';
    } else if (content.includes('section') || content.includes('clause')) {
      preferences.communicationStyle = 'technical';
    }

    // Analyze expertise level
    if (content.includes('what is') || content.includes('explain') || content.includes('basic')) {
      preferences.expertiseLevel = 'beginner';
    } else if (content.includes('advanced') || content.includes('complex') || content.includes('detailed')) {
      preferences.expertiseLevel = 'expert';
    }

    // Analyze compliance focus
    const complianceTopics = [];
    if (content.toLowerCase().includes('gst')) complianceTopics.push('GST');
    if (content.toLowerCase().includes('tds')) complianceTopics.push('TDS');
    if (content.toLowerCase().includes('roc')) complianceTopics.push('ROC');
    if (content.toLowerCase().includes('employment')) complianceTopics.push('Employment');
    if (content.toLowerCase().includes('tax')) complianceTopics.push('Tax');
    
    if (complianceTopics.length > 0) {
      preferences.complianceFocus = complianceTopics;
    }

    return preferences;
  }

  // Store learning data
  private async storeLearningData(interaction: ConversationMessage): Promise<void> {
    try {
      // Extract key topics from user message
      const topics = this.extractTopics(interaction.content);
      
      // Store in learning data
      await db.aiLearningData.upsert({
        where: { userId: this.userId },
        update: {
          frequentQuestions: JSON.stringify([...JSON.parse(data.frequentQuestions || '[]'), interaction.content]),
          preferredTopics: JSON.stringify([...JSON.parse(data.preferredTopics || '[]'), ...topics]),
          lastInteraction: interaction.timestamp
        },
        create: {
          userId: this.userId,
          companyId: this.companyId,
          frequentQuestions: JSON.stringify([interaction.content]),
          preferredTopics: JSON.stringify(topics),
          lastInteraction: interaction.timestamp
        }
      });
    } catch (error) {
      console.error('Failed to store learning data:', error);
    }
  }

  // Extract topics from text
  private extractTopics(text: string): string[] {
    const topics = [];
    const lowerText = text.toLowerCase();
    
    // Legal topics
    if (lowerText.includes('gst')) topics.push('GST');
    if (lowerText.includes('tds')) topics.push('TDS');
    if (lowerText.includes('roc')) topics.push('ROC');
    if (lowerText.includes('employment')) topics.push('Employment');
    if (lowerText.includes('tax')) topics.push('Tax');
    if (lowerText.includes('compliance')) topics.push('Compliance');
    if (lowerText.includes('registration')) topics.push('Registration');
    if (lowerText.includes('filing')) topics.push('Filing');
    if (lowerText.includes('penalty')) topics.push('Penalties');
    if (lowerText.includes('agreement')) topics.push('Agreements');
    if (lowerText.includes('contract')) topics.push('Contracts');
    
    return topics;
  }

  // Update personalized suggestions
  private async updatePersonalizedSuggestions(interaction: ConversationMessage): Promise<void> {
    try {
      // Generate personalized suggestions based on user history
      const suggestions = await this.generatePersonalizedSuggestions(interaction);
      
      await db.aiLearningData.update({
        where: { userId: this.userId },
        data: {
          personalizedSuggestions: JSON.stringify(suggestions)
        }
      });
    } catch (error) {
      console.error('Failed to update personalized suggestions:', error);
    }
  }

  // Generate personalized suggestions
  private async generatePersonalizedSuggestions(interaction: ConversationMessage): Promise<string[]> {
    const suggestions = [];
    const content = interaction.content.toLowerCase();
    
    // GST-related suggestions
    if (content.includes('gst')) {
      suggestions.push('How to file GSTR-1?');
      suggestions.push('What is the GST rate for my product?');
      suggestions.push('How to claim GST input credit?');
      suggestions.push('GST penalty calculation');
    }
    
    // TDS-related suggestions
    if (content.includes('tds')) {
      suggestions.push('TDS rates for different payments');
      suggestions.push('How to generate TDS certificate?');
      suggestions.push('TDS return filing process');
      suggestions.push('TDS due dates');
    }
    
    // Company-related suggestions
    if (content.includes('company') || content.includes('registration')) {
      suggestions.push('What documents are needed for company registration?');
      suggestions.push('How to get CIN number?');
      suggestions.push('ROC compliance requirements');
      suggestions.push('Annual filing requirements');
    }
    
    // Employment-related suggestions
    if (content.includes('employment') || content.includes('hr')) {
      suggestions.push('Employment agreement template');
      suggestions.push('HR policy requirements');
      suggestions.push('Labor law compliance');
      suggestions.push('Employee benefits');
    }
    
    // Compliance-related suggestions
    if (content.includes('compliance') || content.includes('legal')) {
      suggestions.push('Monthly compliance checklist');
      suggestions.push('Annual compliance requirements');
      suggestions.push('Industry-specific regulations');
      suggestions.push('Penalty for non-compliance');
    }
    
    return suggestions.slice(0, 4); // Limit to 4 suggestions
  }

  // Get personalized context for AI
  async getPersonalizedContext(): Promise<string> {
    try {
      const preferences = await this.getUserPreferences();
      const history = await this.getConversationHistory(5);
      const learningData = await this.getLearningData();
      
      let context = `User Profile:
- Business Type: ${preferences.businessType}
- Industry: ${preferences.industry}
- Expertise Level: ${preferences.expertiseLevel}
- Communication Style: ${preferences.communicationStyle}
- Compliance Focus: ${preferences.complianceFocus.join(', ')}

Recent Conversation Context:`;

      // Add recent conversation context
      history.slice(0, 3).forEach(msg => {
        context += `\n${msg.role}: ${msg.content}`;
      });

      if (learningData.frequentQuestions.length > 0) {
        context += `\n\nUser's Common Questions: ${learningData.frequentQuestions.slice(0, 3).join(', ')}`;
      }

      if (learningData.preferredTopics.length > 0) {
        context += `\nPreferred Topics: ${learningData.preferredTopics.slice(0, 5).join(', ')}`;
      }

      return context;
    } catch (error) {
      console.error('Failed to get personalized context:', error);
      return '';
    }
  }

  // Get learning data
  private async getLearningData(): Promise<LearningData> {
    try {
      const data = await db.aiLearningData.findUnique({
        where: { userId: this.userId }
      });

      if (!data) {
        return {
          frequentQuestions: [],
          preferredTopics: [],
          userBehavior: {
            averageSessionLength: 0,
            preferredResponseLength: 'medium',
            mostActiveHours: [],
            commonPainPoints: []
          },
          personalizedSuggestions: [],
          customTemplates: []
        };
      }

      return {
        frequentQuestions: data.frequentQuestions ? JSON.parse(data.frequentQuestions) : [],
        preferredTopics: data.preferredTopics ? JSON.parse(data.preferredTopics) : [],
        userBehavior: {
          averageSessionLength: data.averageSessionLength || 0,
          preferredResponseLength: data.preferredResponseLength || 'medium',
          mostActiveHours: data.mostActiveHours ? JSON.parse(data.mostActiveHours) : [],
          commonPainPoints: data.commonPainPoints ? JSON.parse(data.commonPainPoints) : []
        },
        personalizedSuggestions: data.personalizedSuggestions ? JSON.parse(data.personalizedSuggestions) : [],
        customTemplates: data.customTemplates ? JSON.parse(data.customTemplates) : []
      };
    } catch (error) {
      console.error('Failed to get learning data:', error);
      return {
        frequentQuestions: [],
        preferredTopics: [],
        userBehavior: {
          averageSessionLength: 0,
          preferredResponseLength: 'medium',
          mostActiveHours: [],
          commonPainPoints: []
        },
        personalizedSuggestions: [],
        customTemplates: []
      };
    }
  }

  // Get default preferences
  private getDefaultPreferences(): UserPreferences {
    return {
      preferredLanguage: 'en',
      businessType: 'Private Limited',
      industry: 'Technology',
      complianceFocus: ['GST', 'TDS', 'ROC'],
      communicationStyle: 'professional',
      expertiseLevel: 'intermediate',
      timezone: 'Asia/Kolkata',
      workingHours: '9:00 AM - 6:00 PM'
    };
  }
}
