// Simple AI response system that works without external APIs
// Provides intelligent responses for common legal questions

export interface SimpleAIResponse {
  response: string;
  suggestions: string[];
  source: 'simple-ai';
}

export function generateSimpleAIResponse(message: string): SimpleAIResponse {
  const lowerMessage = message.toLowerCase();
  let response = '';
  let suggestions: string[] = [];

  // GST Registration
  if (lowerMessage.includes('gst registration') || lowerMessage.includes('gst')) {
    response = `For GST registration in India, you typically need:

**Required Documents:**
- PAN Card
- Aadhaar Card
- Business registration certificate
- Bank account details
- Address proof of business place
- Digital signature certificate

**Process:**
1. Visit the GST portal (gst.gov.in)
2. Fill Form GST REG-01
3. Upload required documents
4. Submit and wait for approval
5. Receive GSTIN (GST Identification Number)

**Important:** GST registration is mandatory if your annual turnover exceeds ₹20 lakhs (₹10 lakhs for special category states).

*Note: This is general information. Please consult a qualified tax advisor for specific guidance.*`;

    suggestions = [
      "What is the GST rate for my product?",
      "How to file GSTR-1?",
      "What is the penalty for late GST filing?"
    ];
  }
  // TDS Returns
  else if (lowerMessage.includes('tds') || lowerMessage.includes('tds return')) {
    response = `TDS (Tax Deducted at Source) returns are filed quarterly:

**Common TDS Forms:**
- Form 24Q: For salary payments
- Form 26Q: For non-salary payments
- Form 27Q: For payments to non-residents

**Filing Deadlines:**
- Q1 (Apr-Jun): July 31st
- Q2 (Jul-Sep): October 31st
- Q3 (Oct-Dec): January 31st
- Q4 (Jan-Mar): May 31st

**Process:**
1. Login to TRACES portal
2. Select the appropriate form
3. Fill in TDS details
4. Validate and submit
5. Generate TDS certificate

**Penalties:** Late filing attracts ₹200 per day penalty.

*Note: TDS compliance is crucial for businesses. Consult a tax professional for specific requirements.*`;

    suggestions = [
      "What are the TDS rates for different payments?",
      "How to generate TDS certificate?",
      "What is the penalty for late TDS filing?"
    ];
  }
  // Startup Compliance
  else if (lowerMessage.includes('startup') || lowerMessage.includes('compliance')) {
    response = `Key compliance requirements for Indian startups:

**Essential Registrations:**
- Company registration (ROC)
- GST registration (if applicable)
- Professional tax registration
- ESI registration (if employees > 10)
- EPF registration (if employees > 20)

**Annual Compliance:**
- Annual return filing (Form MGT-7)
- Balance sheet filing (Form AOC-4)
- Income tax return filing
- GST returns (monthly/quarterly)
- Board meetings and resolutions

**Startup Benefits:**
- Tax holiday under Section 80-IAC
- Faster patent processing
- Self-certification for labor laws
- Startup India recognition benefits

**Important Deadlines:**
- Annual return: Within 60 days of AGM
- Balance sheet: Within 30 days of AGM
- Income tax return: July 31st (individuals) / October 31st (companies)

*Note: Compliance requirements vary based on business structure and industry. Seek professional advice.*`;

    suggestions = [
      "What documents are needed for company registration?",
      "How to get startup India recognition?",
      "What are the tax benefits for startups?"
    ];
  }
  // Employment Agreement
  else if (lowerMessage.includes('employment') || lowerMessage.includes('agreement')) {
    response = `An employment agreement should include:

**Essential Clauses:**
- Job title and description
- Salary and benefits
- Working hours and location
- Probation period
- Notice period for termination
- Confidentiality and non-disclosure
- Intellectual property rights
- Non-compete clause (if applicable)

**Legal Requirements:**
- Minimum wage compliance
- Working hours (max 48 hours/week)
- Leave entitlements (annual, sick, casual)
- Termination procedures
- Grievance redressal mechanism

**Key Considerations:**
- Clear job responsibilities
- Performance evaluation criteria
- Training and development provisions
- Dispute resolution mechanism
- Applicable labor laws compliance

**Important:** Employment agreements must comply with the Industrial Disputes Act, 1947 and other labor laws.

*Note: Employment law is complex. Consult a labor law expert for specific agreements.*`;

    suggestions = [
      "How to draft a non-disclosure agreement?",
      "What are the labor law requirements?",
      "How to handle employee termination?"
    ];
  }
  // Company Registration
  else if (lowerMessage.includes('company registration') || lowerMessage.includes('register company')) {
    response = `Company registration process in India:

**Types of Companies:**
- Private Limited Company (most popular for startups)
- Public Limited Company
- One Person Company (OPC)
- Limited Liability Partnership (LLP)

**Private Limited Company Requirements:**
- Minimum 2 directors (max 15)
- Minimum 2 shareholders (max 200)
- Minimum paid-up capital: ₹1 lakh
- Unique company name
- Registered office address

**Registration Process:**
1. Obtain Digital Signature Certificate (DSC)
2. Apply for Director Identification Number (DIN)
3. Name approval (RUN form)
4. File incorporation documents (SPICe+)
5. Pay registration fees
6. Receive Certificate of Incorporation

**Required Documents:**
- PAN and Aadhaar of directors
- Address proof of registered office
- Memorandum of Association (MOA)
- Articles of Association (AOA)
- Declaration by directors

**Timeline:** 7-14 days for approval

*Note: Company registration is complex. Consider hiring a company secretary or legal expert.*`;

    suggestions = [
      "What is the minimum capital for private limited company?",
      "How to get DIN and DSC?",
      "What are the ongoing compliance requirements?"
    ];
  }
  // Penalties
  else if (lowerMessage.includes('penalty') || lowerMessage.includes('late filing')) {
    response = `Common penalties for late filing in India:

**GST Late Filing Penalties:**
- Late fee: ₹50 per day (₹20 for nil returns)
- Maximum late fee: ₹5,000
- Interest: 18% per annum on tax due
- Additional penalty: 10% of tax due (minimum ₹10,000)

**Income Tax Late Filing:**
- Late filing fee: ₹5,000 (₹1,000 if income < ₹5 lakhs)
- Interest: 1% per month on tax due
- Penalty: 50% of tax due for concealment

**TDS Late Filing:**
- Late filing fee: ₹200 per day
- Interest: 1.5% per month on TDS amount
- Penalty: ₹10,000 to ₹1,00,000

**ROC Late Filing:**
- Additional fees: ₹100 per day
- Penalty: ₹1,000 to ₹1,00,000
- Director disqualification (if repeated defaults)

**Prevention Tips:**
- Set up automated reminders
- Maintain proper records
- Use professional services
- File returns on time

*Note: Penalties can be substantial. Always file returns on time and maintain compliance.*`;

    suggestions = [
      "How to avoid late filing penalties?",
      "What are the interest rates for late payment?",
      "How to set up compliance reminders?"
    ];
  }
  // General Legal Help
  else if (lowerMessage.includes('legal') || lowerMessage.includes('help')) {
    response = `I'm here to help with Indian legal compliance! Here's what I can assist with:

**Business Formation:**
- Company registration
- Partnership registration
- LLP formation
- Startup India recognition

**Tax Compliance:**
- GST registration and returns
- Income tax filing
- TDS compliance
- Professional tax

**Employment Law:**
- Employment agreements
- HR policies
- Labor law compliance
- Employee benefits

**Intellectual Property:**
- Trademark registration
- Patent filing
- Copyright protection
- Trade secrets

**Ongoing Compliance:**
- Annual filings
- Board meetings
- Statutory audits
- Regulatory compliance

**How to get started:**
1. Ask specific questions about your business
2. Get step-by-step guidance
3. Understand legal requirements
4. Plan your compliance strategy

*Remember: I provide general guidance. For specific legal advice, always consult a qualified lawyer.*`;

    suggestions = [
      "What documents do I need for GST registration?",
      "How to file TDS returns?",
      "What are the compliance requirements for a startup?"
    ];
  }
  // Default response
  else {
    response = `I understand you're looking for legal guidance. I can help with:

**Popular Topics:**
- Business registration and compliance
- Tax filing and returns
- Employment law and HR
- Intellectual property
- Contract drafting

**Quick Help:**
- Ask me about specific legal requirements
- Get step-by-step guidance
- Understand penalties and deadlines
- Plan your compliance strategy

**Examples of questions I can answer:**
- "What documents do I need for GST registration?"
- "How to file TDS returns?"
- "What are the compliance requirements for a startup?"
- "How to draft an employment agreement?"

*Note: I provide general legal information. For specific legal advice, please consult a qualified lawyer.*

What specific legal question can I help you with today?`;

    suggestions = [
      "What documents do I need for GST registration?",
      "How to file TDS returns?",
      "What are the compliance requirements for a startup?",
      "Generate an employment agreement template"
    ];
  }

  return {
    response,
    suggestions,
    source: 'simple-ai'
  };
}
