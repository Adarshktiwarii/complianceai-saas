import { z } from 'zod';

// User validation schemas
export const userRegistrationSchema = z.object({
  name: z.string().min(2).max(50).regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  email: z.string().email().max(100),
  password: z.string().min(8).max(128).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
  ),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number').optional()
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

// AI Chat validation
export const aiChatSchema = z.object({
  message: z.string().min(1).max(1000).trim(),
  context: z.string().max(5000).optional(),
  sessionId: z.string().uuid().optional()
});

// Document generation validation
export const documentGenerationSchema = z.object({
  templateId: z.string().uuid(),
  userInputs: z.record(z.string(), z.any()),
  companyId: z.string().uuid()
});

// Company validation
export const companySchema = z.object({
  companyName: z.string().min(2).max(100),
  industry: z.string().max(50).optional(),
  companyType: z.enum(['Private Limited', 'Public Limited', 'LLP', 'Partnership', 'Sole Proprietorship']),
  incorporationDate: z.string().datetime().optional(),
  cin: z.string().max(21).optional(),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format').optional(),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format').optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(50).optional(),
  state: z.string().max(50).optional(),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Invalid pincode').optional(),
  directorDetails: z.string().max(1000).optional()
});

// Payment validation
export const paymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  orderId: z.string().uuid(),
  customerId: z.string().uuid()
});

// Compliance task validation
export const complianceTaskSchema = z.object({
  taskType: z.string().min(1).max(100),
  dueDate: z.string().datetime(),
  priority: z.enum(['low', 'medium', 'high']),
  description: z.string().max(1000).optional()
});

// Generic validation helper
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Validation failed: ${errorMessages.join(', ')}`);
    }
    throw error;
  }
}

// Sanitization helpers
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}
