import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './db';
import { User } from '../types';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function createUserSession(userId: string): Promise<string> {
  const sessionToken = generateToken(userId);
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  await prisma.userSession.create({
    data: {
      userId,
      sessionToken,
      expires
    }
  });
  
  return sessionToken;
}

export async function getUserFromSession(sessionToken: string): Promise<User | null> {
  const session = await prisma.userSession.findUnique({
    where: { sessionToken },
    include: { user: true }
  });
  
  if (!session || session.expires < new Date()) {
    return null;
  }
  
  return session.user;
}

export async function deleteUserSession(sessionToken: string): Promise<void> {
  await prisma.userSession.delete({
    where: { sessionToken }
  });
}
