import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { hashPassword, createUserSession } from '@/lib/auth';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = registerSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }
    
    // Create user
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash
      }
    });
    
    // Create session
    const sessionToken = await createUserSession(user.id);
    
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      }
    });
    
    // Set session cookie
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
