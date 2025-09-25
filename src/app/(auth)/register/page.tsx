'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-blue-600">ComplianceAI</span>
          </div>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Get started with AI-powered legal compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
