#!/bin/bash
# scripts/setup.sh - CURSOR: Create this setup script

echo "🚀 Setting up ComplianceAI development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment variables
if [ ! -f .env.local ]; then
    echo "🔧 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please configure your environment variables in .env.local"
fi

# Setup database
echo "🗄️ Setting up database..."
npx prisma generate
npx prisma db push
npx prisma db seed

# Setup pre-commit hooks
echo "🔧 Setting up Git hooks..."
npm run prepare

# Install Playwright browsers for E2E testing
echo "🎭 Installing Playwright browsers..."
npx playwright install

echo "✅ Development environment setup complete!"
echo "📚 Run 'npm run dev' to start the development server"
echo "🧪 Run 'npm test' to run tests"
echo "📖 Check README.md for more information"
