# 🚀 ComplianceAI - Startup Legal Copilot

[![CI/CD](https://github.com/[USERNAME]/complianceai-saas/actions/workflows/ci.yml/badge.svg)](https://github.com/[USERNAME]/complianceai-saas/actions)
[![Coverage](https://codecov.io/gh/[USERNAME]/complianceai-saas/branch/main/graph/badge.svg)](https://codecov.io/gh/[USERNAME]/complianceai-saas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AI-powered legal compliance and document generation platform for Indian startups.

## 🎯 Mission
Automate legal compliance for Indian startups, saving 20+ hours/month and ₹50,000+ in legal fees.

## 🏗️ Architecture
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL (AWS RDS)
- **AI**: OpenAI GPT-4 for document generation
- **Payments**: Razorpay (Indian market focus)
- **Storage**: AWS S3 for document storage
- **Deployment**: AWS ECS + Docker
- **Monitoring**: CloudWatch + Sentry

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- AWS Account
- OpenAI API Key
- Razorpay Account

### Installation
```bash
git clone https://github.com/[USERNAME]/complianceai-saas.git
cd complianceai-saas
npm install
cp .env.example .env.local
# Configure environment variables
npm run dev
```

### Database Setup
```bash
npx prisma migrate dev
npx prisma db seed
```

## 📦 Features
- ✅ AI-powered document generation
- ✅ Automated compliance tracking
- ✅ Indian regulatory calendar integration
- ✅ Multi-tier subscription system
- ✅ PDF generation and storage
- ✅ Email notifications
- ✅ Audit logging
- ✅ Performance monitoring

## 🎯 Business Model
- **Starter**: ₹2,999/month (5 docs)
- **Growth**: ₹7,999/month (25 docs) 
- **Scale**: ₹15,999/month (unlimited)

## 🤝 Contributing
See [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

## 📚 Documentation
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)

## 📄 License
MIT License - see [LICENSE](./LICENSE)
