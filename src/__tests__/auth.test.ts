import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../lib/auth';

describe('Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash password correctly', async () => {
      const password = 'TestPassword123!';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(50);
    });

    it('should generate different hashes for same password', async () => {
      const password = 'TestPassword123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyPassword', () => {
    it('should verify correct password', async () => {
      const password = 'TestPassword123!';
      const hashed = await hashPassword(password);
      const isValid = await verifyPassword(password, hashed);
      
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword123!';
      const hashed = await hashPassword(password);
      const isValid = await verifyPassword(wrongPassword, hashed);
      
      expect(isValid).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a valid token', () => {
      const userId = 'test-user-id';
      const token = generateToken(userId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token', () => {
      const userId = 'test-user-id';
      const token = generateToken(userId);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe(userId);
    });

    it('should return null for invalid token', () => {
      const invalidToken = 'invalid-token';
      const decoded = verifyToken(invalidToken);
      
      expect(decoded).toBeNull();
    });
  });
});
