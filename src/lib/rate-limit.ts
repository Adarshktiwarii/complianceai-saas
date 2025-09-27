import { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime?: number;
  error?: string;
}

export function rateLimit(limit: number = 100, windowMs: number = 15 * 60 * 1000) {
  return (req: NextRequest): RateLimitResult => {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean up expired records
    for (const [key, record] of rateLimitMap.entries()) {
      if (record.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
    
    const record = rateLimitMap.get(ip);
    
    if (!record || record.resetTime < now) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return { 
        success: true, 
        remaining: limit - 1,
        resetTime: now + windowMs
      };
    }
    
    if (record.count >= limit) {
      return { 
        success: false, 
        remaining: 0, 
        resetTime: record.resetTime,
        error: 'Rate limit exceeded'
      };
    }
    
    record.count++;
    return { 
      success: true, 
      remaining: limit - record.count,
      resetTime: record.resetTime
    };
  };
}

// Specific rate limits for different endpoints
export const rateLimits = {
  // Authentication endpoints - stricter limits
  auth: rateLimit(5, 15 * 60 * 1000), // 5 requests per 15 minutes
  
  // AI chat endpoints - moderate limits
  aiChat: rateLimit(20, 15 * 60 * 1000), // 20 requests per 15 minutes
  
  // Document generation - moderate limits
  documentGeneration: rateLimit(10, 15 * 60 * 1000), // 10 requests per 15 minutes
  
  // General API endpoints - standard limits
  general: rateLimit(100, 15 * 60 * 1000), // 100 requests per 15 minutes
  
  // Public endpoints - higher limits
  public: rateLimit(200, 15 * 60 * 1000) // 200 requests per 15 minutes
};

// Rate limit middleware for API routes
export function withRateLimit(
  rateLimitFn: (req: NextRequest) => RateLimitResult,
  req: NextRequest
): Response | null {
  const result = rateLimitFn(req);
  
  if (!result.success) {
    return new Response(
      JSON.stringify({
        success: false,
        error: result.error || 'Rate limit exceeded',
        remaining: result.remaining,
        resetTime: result.resetTime
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': result.resetTime?.toString() || '',
          'Retry-After': result.resetTime ? Math.ceil((result.resetTime - Date.now()) / 1000).toString() : '900'
        }
      }
    );
  }
  
  return null;
}

// IP-based rate limiting with different tiers
export function getRateLimitForIP(ip: string): (req: NextRequest) => RateLimitResult {
  // Premium users get higher limits
  if (isPremiumIP(ip)) {
    return rateLimit(500, 15 * 60 * 1000);
  }
  
  // Regular users get standard limits
  return rateLimit(100, 15 * 60 * 1000);
}

function isPremiumIP(ip: string): boolean {
  // Check if IP is in premium list (implement your logic)
  const premiumIPs = process.env.PREMIUM_IPS?.split(',') || [];
  return premiumIPs.includes(ip);
}

// Clean up expired rate limit records
export function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (record.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimits, 5 * 60 * 1000);
