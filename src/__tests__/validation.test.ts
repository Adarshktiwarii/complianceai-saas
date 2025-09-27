import { describe, it, expect } from '@jest/globals';
import { 
  userRegistrationSchema, 
  aiChatSchema, 
  documentGenerationSchema,
  validateInput,
  sanitizeString,
  sanitizeHtml,
  sanitizeObject
} from '../lib/validation';

describe('Validation', () => {
  describe('userRegistrationSchema', () => {
    it('should validate correct user data', () => {
      const validUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'TestPassword123!',
        phone: '9876543210'
      };

      const result = userRegistrationSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidUser = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'TestPassword123!'
      };

      const result = userRegistrationSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });

    it('should reject weak password', () => {
      const invalidUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak'
      };

      const result = userRegistrationSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });

    it('should reject invalid phone number', () => {
      const invalidUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'TestPassword123!',
        phone: '1234567890' // Invalid Indian phone number
      };

      const result = userRegistrationSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });
  });

  describe('aiChatSchema', () => {
    it('should validate correct chat data', () => {
      const validChat = {
        message: 'What is GST registration?',
        context: 'I am a startup founder',
        sessionId: '123e4567-e89b-12d3-a456-426614174000'
      };

      const result = aiChatSchema.safeParse(validChat);
      expect(result.success).toBe(true);
    });

    it('should reject empty message', () => {
      const invalidChat = {
        message: '',
        context: 'I am a startup founder'
      };

      const result = aiChatSchema.safeParse(invalidChat);
      expect(result.success).toBe(false);
    });

    it('should reject message that is too long', () => {
      const invalidChat = {
        message: 'a'.repeat(1001), // Too long
        context: 'I am a startup founder'
      };

      const result = aiChatSchema.safeParse(invalidChat);
      expect(result.success).toBe(false);
    });
  });

  describe('documentGenerationSchema', () => {
    it('should validate correct document data', () => {
      const validDocument = {
        templateId: '123e4567-e89b-12d3-a456-426614174000',
        userInputs: {
          companyName: 'Test Company',
          directorName: 'John Doe'
        },
        companyId: '123e4567-e89b-12d3-a456-426614174000'
      };

      const result = documentGenerationSchema.safeParse(validDocument);
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID', () => {
      const invalidDocument = {
        templateId: 'invalid-uuid',
        userInputs: {},
        companyId: '123e4567-e89b-12d3-a456-426614174000'
      };

      const result = documentGenerationSchema.safeParse(invalidDocument);
      expect(result.success).toBe(false);
    });
  });

  describe('validateInput', () => {
    it('should return parsed data for valid input', () => {
      const validUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'TestPassword123!'
      };

      const result = validateInput(userRegistrationSchema, validUser);
      expect(result).toEqual(validUser);
    });

    it('should throw error for invalid input', () => {
      const invalidUser = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'TestPassword123!'
      };

      expect(() => {
        validateInput(userRegistrationSchema, invalidUser);
      }).toThrow('Validation failed');
    });
  });

  describe('sanitizeString', () => {
    it('should sanitize string correctly', () => {
      const input = '  <script>alert("xss")</script>  ';
      const result = sanitizeString(input);
      
      expect(result).toBe('alert("xss")');
    });

    it('should trim whitespace', () => {
      const input = '  hello world  ';
      const result = sanitizeString(input);
      
      expect(result).toBe('hello world');
    });
  });

  describe('sanitizeHtml', () => {
    it('should escape HTML characters', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeHtml(input);
      
      expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });
  });

  describe('sanitizeObject', () => {
    it('should sanitize all string values in object', () => {
      const input = {
        name: '  <script>alert("xss")</script>  ',
        email: 'test@example.com',
        age: 25,
        nested: {
          description: '  <b>bold</b>  '
        }
      };

      const result = sanitizeObject(input);
      
      expect(result.name).toBe('alert("xss")');
      expect(result.email).toBe('test@example.com');
      expect(result.age).toBe(25);
      expect(result.nested.description).toBe('bold');
    });
  });
});
