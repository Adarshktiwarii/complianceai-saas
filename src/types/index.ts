export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  userId: string;
  companyName: string;
  industry?: string;
  companyType: string;
  incorporationDate?: Date;
  cin?: string;
  gstin?: string;
  pan?: string;
  registeredAddress?: string;
  businessAddress?: string;
  state?: string;
  city?: string;
  pincode?: string;
  authorizedCapital?: number;
  paidUpCapital?: number;
  directorDetails?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  companyId: string;
  planType: 'starter' | 'growth' | 'scale';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  razorpaySubscriptionId?: string;
  monthlyPrice: number;
  documentsUsed: number;
  documentsLimit: number;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  description?: string;
  requiredFields: Record<string, any>;
  optionalFields?: Record<string, any>;
  price: number;
  complexityLevel: 'simple' | 'medium' | 'complex';
  estimatedTime?: string;
  legalCategory?: string;
}

export interface GeneratedDocument {
  id: string;
  companyId: string;
  templateId?: string;
  documentName: string;
  documentType?: string;
  content?: string;
  filledData?: Record<string, any>;
  status: 'draft' | 'completed' | 'reviewed' | 'signed';
  fileUrl?: string;
  downloadCount: number;
  version: number;
  generatedAt: Date;
}

export interface ComplianceTask {
  id: string;
  companyId: string;
  taskName: string;
  description?: string;
  taskType: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  recurring: boolean;
  recurringInterval?: string;
  reminderSent: boolean;
  completionDate?: Date;
  notes?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
