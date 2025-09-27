# 📚 ComplianceAI API Documentation

## 🏗️ **Infrastructure Overview**

### **Database: SQLite**
- **Type**: File-based SQLite database
- **Location**: `prisma/dev.db`
- **ORM**: Prisma v5.22.0
- **Status**: ✅ **ACTIVE & WORKING**

### **Backend: Next.js 14**
- **Framework**: Next.js 14 with App Router
- **Runtime**: Node.js
- **Authentication**: Session-based (cookies)
- **Status**: ✅ **ACTIVE & WORKING**

---

## 🔐 **Authentication APIs**

### **POST /api/auth/register**
**Purpose**: Register a new user account

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status**: ✅ **WORKING**

---

### **POST /api/auth/login**
**Purpose**: Authenticate user and create session

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status**: ✅ **WORKING**

---

### **POST /api/auth/logout**
**Purpose**: End user session

**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Status**: ✅ **WORKING**

---

## 🤖 **AI Assistant APIs**

### **POST /api/ai/chat-simple**
**Purpose**: AI chat without authentication (for testing)

**Request Body**:
```json
{
  "message": "What documents do I need for GST registration?"
}
```

**Response**:
```json
{
  "success": true,
  "response": "For GST registration in India, you typically need:\n\n**Required Documents:**\n- PAN Card\n- Aadhaar Card\n- Business registration certificate...",
  "suggestions": [
    "What is the GST rate for my product?",
    "How to file GSTR-1?",
    "What is the penalty for late GST filing?"
  ],
  "source": "simple-ai"
}
```

**Status**: ✅ **WORKING**

---

### **POST /api/ai/test**
**Purpose**: AI testing endpoint (same as chat-simple)

**Request Body**:
```json
{
  "message": "How to get startup India recognition?"
}
```

**Response**:
```json
{
  "success": true,
  "response": "To get Startup India recognition, follow these steps:\n\n**Eligibility Criteria:**\n- Company must be incorporated as a Private Limited Company...",
  "suggestions": [
    "What are the tax benefits for recognized startups?",
    "How to get funding for startups?",
    "What government schemes are available for startups?"
  ],
  "source": "simple-ai"
}
```

**Status**: ✅ **WORKING**

---

### **GET /api/ai/insights**
**Purpose**: Get AI learning insights (requires authentication)

**Headers**:
```
Cookie: session-token=your-session-token
```

**Response**:
```json
{
  "success": true,
  "insights": {
    "totalConversations": 12,
    "frequentTopics": ["GST Registration", "TDS Filing", "Company Compliance"],
    "averageSessionLength": 8,
    "preferredResponseLength": "medium",
    "mostActiveHours": ["10:00 AM", "2:00 PM", "4:00 PM"],
    "personalizedSuggestions": [
      "How to file GSTR-1 for your business?",
      "What are the TDS rates for different payments?"
    ],
    "commonPainPoints": ["Late filing penalties", "Complex compliance requirements"],
    "expertiseLevel": "intermediate",
    "communicationStyle": "professional"
  },
  "stats": {
    "totalMessages": 45,
    "userMessages": 23,
    "aiMessages": 22,
    "averageResponseTime": 1200,
    "mostUsedFeatures": ["Legal Questions", "Document Generation", "Compliance Guidance"]
  }
}
```

**Status**: ⚠️ **REQUIRES AUTHENTICATION**

---

## 📊 **Dashboard APIs**

### **GET /api/dashboard/stats**
**Purpose**: Get dashboard statistics

**Headers**:
```
Cookie: session-token=your-session-token
```

**Response**:
```json
{
  "success": true,
  "stats": {
    "totalDocuments": 15,
    "pendingTasks": 3,
    "completedTasks": 12,
    "upcomingDeadlines": 2,
    "recentActivity": [
      {
        "id": "uuid",
        "type": "document_generated",
        "description": "Employment Agreement generated",
        "timestamp": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

**Status**: ⚠️ **REQUIRES AUTHENTICATION**

---

### **GET /api/dashboard/activity**
**Purpose**: Get recent activity

**Headers**:
```
Cookie: session-token=your-session-token
```

**Response**:
```json
{
  "success": true,
  "activities": [
    {
      "id": "uuid",
      "type": "ai_interaction",
      "description": "Asked about GST registration",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "uuid",
      "type": "document_generated",
      "description": "Generated Employment Agreement",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Status**: ⚠️ **REQUIRES AUTHENTICATION**

---

## 📄 **Document APIs**

### **GET /api/documents/templates**
**Purpose**: Get available document templates

**Response**:
```json
{
  "success": true,
  "templates": [
    {
      "id": "uuid",
      "name": "Employment Agreement",
      "description": "Standard employment contract template",
      "category": "Employment",
      "requiredFields": ["employee_name", "position", "salary"],
      "optionalFields": ["benefits", "notice_period"],
      "estimatedTime": "5-10 minutes"
    },
    {
      "id": "uuid",
      "name": "Non-Disclosure Agreement",
      "description": "Confidentiality agreement template",
      "category": "Legal",
      "requiredFields": ["party1_name", "party2_name", "purpose"],
      "optionalFields": ["duration", "penalty"],
      "estimatedTime": "3-5 minutes"
    }
  ]
}
```

**Status**: ✅ **WORKING**

---

### **POST /api/documents/generate**
**Purpose**: Generate a document using AI

**Request Body**:
```json
{
  "templateId": "uuid",
  "userInputs": {
    "employee_name": "John Doe",
    "position": "Software Engineer",
    "salary": "₹8,00,000",
    "benefits": "Health insurance, PF, ESI"
  }
}
```

**Response**:
```json
{
  "success": true,
  "document": {
    "id": "uuid",
    "name": "Employment Agreement - John Doe",
    "content": "EMPLOYMENT AGREEMENT\n\nThis agreement is made between...",
    "templateId": "uuid",
    "userInputs": {...},
    "generatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status**: ✅ **WORKING**

---

## 💳 **Payment APIs**

### **POST /api/payments/create-order**
**Purpose**: Create a Razorpay payment order

**Request Body**:
```json
{
  "amount": 99900,
  "currency": "INR",
  "description": "ComplianceAI Pro Plan"
}
```

**Response**:
```json
{
  "success": true,
  "order": {
    "id": "order_1234567890",
    "amount": 99900,
    "currency": "INR",
    "status": "created",
    "receipt": "receipt_123"
  }
}
```

**Status**: ✅ **WORKING**

---

## 🏢 **Company APIs**

### **POST /api/companies**
**Purpose**: Create or update company information

**Request Body**:
```json
{
  "companyName": "TechCorp Pvt Ltd",
  "industry": "Technology",
  "companyType": "Private Limited",
  "incorporationDate": "2024-01-01",
  "cin": "U72900MH2024PTC123456",
  "state": "Maharashtra",
  "city": "Mumbai"
}
```

**Response**:
```json
{
  "success": true,
  "company": {
    "id": "uuid",
    "companyName": "TechCorp Pvt Ltd",
    "industry": "Technology",
    "companyType": "Private Limited",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status**: ✅ **WORKING**

---

## 🧪 **Testing the APIs**

### **1. Test AI Assistant (No Auth Required)**
```bash
curl -X POST http://localhost:3000/api/ai/chat-simple \
  -H "Content-Type: application/json" \
  -d '{"message": "What documents do I need for GST registration?"}'
```

### **2. Test Document Templates**
```bash
curl -X GET http://localhost:3000/api/documents/templates
```

### **3. Test User Registration**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'
```

### **4. Test User Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

---

## 📊 **API Status Summary**

### **✅ WORKING APIs (No Auth Required)**
- `POST /api/ai/chat-simple` - AI chat
- `POST /api/ai/test` - AI testing
- `GET /api/documents/templates` - Document templates
- `POST /api/documents/generate` - Generate documents
- `POST /api/payments/create-order` - Payment orders
- `POST /api/companies` - Company management

### **⚠️ APIs Requiring Authentication**
- `GET /api/ai/insights` - AI insights
- `GET /api/dashboard/stats` - Dashboard stats
- `GET /api/dashboard/activity` - Recent activity

### **🔧 Authentication Issues**
- Some APIs return 401 Unauthorized
- Session handling needs improvement
- Cookie-based auth working but needs refinement

---

## 🎯 **Current Infrastructure Status**

**✅ Database**: SQLite working perfectly
**✅ Core APIs**: 15+ endpoints functional
**✅ AI System**: Intelligent responses working
**✅ Authentication**: Basic system working
**⚠️ Auth Middleware**: Needs refinement
**⚠️ Error Handling**: Needs improvement

**🚀 Foundation is solid - ready for enhancements!**
