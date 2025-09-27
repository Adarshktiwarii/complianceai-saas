import { NextRequest } from 'next/server';
import { logger } from './logger';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public timestamp: Date;

  constructor(
    message: string, 
    statusCode: number = 500, 
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date();

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(field ? `${field}: ${message}` : message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string = 'External service error') {
    super(`${service}: ${message}`, 502);
  }
}

export function handleError(error: Error, req: NextRequest): Response {
  // Log the error
  logger.error({
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.headers.get('user-agent'),
    timestamp: new Date().toISOString()
  });

  // Handle known error types
  if (error instanceof AppError) {
    return Response.json(
      {
        success: false,
        error: error.message,
        statusCode: error.statusCode,
        timestamp: error.timestamp.toISOString()
      },
      { status: error.statusCode }
    );
  }

  // Handle validation errors
  if (error.name === 'ZodError') {
    return Response.json(
      {
        success: false,
        error: 'Validation failed',
        details: error.message,
        statusCode: 400
      },
      { status: 400 }
    );
  }

  // Handle Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    return handlePrismaError(error, req);
  }

  // Handle network errors
  if (error.name === 'FetchError' || error.name === 'NetworkError') {
    return Response.json(
      {
        success: false,
        error: 'Network error',
        statusCode: 503
      },
      { status: 503 }
    );
  }

  // Handle unknown errors
  return Response.json(
    {
      success: false,
      error: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : error.message,
      statusCode: 500
    },
    { status: 500 }
  );
}

function handlePrismaError(error: any, req: NextRequest): Response {
  const { code, meta } = error;
  
  switch (code) {
    case 'P2002':
      return Response.json(
        {
          success: false,
          error: 'Resource already exists',
          field: meta?.target?.[0],
          statusCode: 409
        },
        { status: 409 }
      );
    
    case 'P2025':
      return Response.json(
        {
          success: false,
          error: 'Resource not found',
          statusCode: 404
        },
        { status: 404 }
      );
    
    case 'P2003':
      return Response.json(
        {
          success: false,
          error: 'Foreign key constraint failed',
          statusCode: 400
        },
        { status: 400 }
      );
    
    default:
      return Response.json(
        {
          success: false,
          error: 'Database operation failed',
          statusCode: 500
        },
        { status: 500 }
      );
  }
}

// Global error handler for unhandled promise rejections
export function setupGlobalErrorHandlers(): void {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error({
      type: 'unhandledRejection',
      reason: reason,
      promise: promise,
      timestamp: new Date().toISOString()
    });
  });

  process.on('uncaughtException', (error) => {
    logger.error({
      type: 'uncaughtException',
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    // Graceful shutdown
    process.exit(1);
  });
}

// Error boundary for React components
export function createErrorBoundary() {
  return class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      logger.error({
        type: 'reactErrorBoundary',
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString()
      });
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-50 text-red-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-lg text-center mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        );
      }

      return this.props.children;
    }
  };
}

// Initialize global error handlers
setupGlobalErrorHandlers();
