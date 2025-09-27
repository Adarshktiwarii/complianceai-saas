// Free AI API integration using Hugging Face
// This provides a free alternative to OpenAI for development

export interface FreeAIResponse {
  response: string;
  suggestions: string[];
  source: 'huggingface' | 'fallback';
}

export async function generateFreeAIResponse(message: string): Promise<FreeAIResponse> {
  try {
    // Try Hugging Face API first (free)
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || 'hf_your_token_here'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: message,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          do_sample: true
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const aiResponse = data[0]?.generated_text || data.generated_text || 'I understand your question. Let me help you with that.';
      
      return {
        response: formatLegalResponse(aiResponse, message),
        suggestions: generateSuggestions(message),
        source: 'huggingface'
      };
    }
  } catch (error) {
    console.error('Hugging Face API error:', error);
  }

  // Fallback to rule-based responses
  return {
    response: getFallbackResponse(message),
    suggestions: generateSuggestions(message),
    source: 'fallback'
  };
}

function formatLegalResponse(response: string, originalMessage: string): string {
  const lowerMessage = originalMessage.toLowerCase();
  
  // Add legal context based on the question
  if (lowerMessage.includes('gst') || lowerMessage.includes('tax')) {
    return `Based on your question about taxes, here's what you need to know:

${response}

**Important Tax Information:**
• GST registration is mandatory for businesses with turnover > ₹20 lakhs
• GSTR-1 must be filed monthly by the 11th
• GSTR-3B must be filed monthly by the 20th
• Late filing attracts ₹200 per day penalty

**Next Steps:**
1. Ensure your business is properly registered
2. Maintain accurate records of all transactions
3. File returns on time to avoid penalties
4. Consider using GST software for easier compliance

*Note: This is general information. Always consult with a qualified tax advisor for specific guidance.*`;
  }
  
  if (lowerMessage.includes('company') || lowerMessage.includes('registration')) {
    return `Regarding company registration, here's the guidance:

${response}

**Company Registration Process:**
1. **Choose Business Structure:** Private Limited, LLP, or OPC
2. **Obtain DSC:** Digital Signature Certificate for directors
3. **Get DIN:** Director Identification Number
4. **Name Approval:** Check availability on MCA portal
5. **File Documents:** MOA, AOA, and other required documents
6. **Get Certificate:** Certificate of Incorporation

**Required Documents:**
• PAN and Aadhaar of directors
• Address proof of registered office
• MOA and AOA
• Declaration by subscribers

*Timeline: 7-15 days if all documents are correct*

*Note: This is general guidance. Consult with a qualified professional for specific requirements.*`;
  }
  
  if (lowerMessage.includes('employment') || lowerMessage.includes('hr')) {
    return `For employment-related matters:

${response}

**Employment Law Essentials:**
• Employment agreements must include job description, salary, and terms
• Minimum wage compliance is mandatory
• Statutory benefits include PF, ESI, and leave entitlements
• Proper termination procedures must be followed
• Confidentiality and non-compete clauses should be included

**HR Compliance:**
• Maintain proper employee records
• Follow labor law requirements
• Implement proper grievance procedures
• Ensure workplace safety standards

*Note: Employment laws vary by state. Consult with a qualified HR professional or lawyer.*`;
  }
  
  if (lowerMessage.includes('compliance') || lowerMessage.includes('legal')) {
    return `For legal compliance matters:

${response}

**Key Compliance Areas:**
• **Monthly:** TDS returns, professional tax, ESI/PF (if applicable)
• **Quarterly:** GST returns, TDS returns, ROC compliance
• **Annual:** Income tax returns, ROC filings, audit reports

**Startup-Specific Benefits:**
• 3-year tax holiday (if eligible)
• Fast-track patent examination
• Self-certification for labor laws
• Startup India benefits

**Best Practices:**
• Set up automated reminders for deadlines
• Maintain proper documentation
• Use compliance software
• Consult with professionals regularly

*Note: Compliance requirements vary by business type and location. Always consult with qualified professionals.*`;
  }
  
  // Default response
  return `I understand your question about business and legal matters. Here's my response:

${response}

**General Business Guidance:**
• Ensure proper business registration
• Maintain accurate financial records
• Comply with all applicable laws
• Consult with qualified professionals
• Stay updated with regulatory changes

**Important Reminder:**
This is general information and should not be considered as legal advice. Always consult with qualified lawyers, accountants, and other professionals for specific guidance related to your business.

Would you like me to help you with any specific aspect of your business compliance?`;
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('gst')) {
    return `For GST-related queries, here's what you need to know:

**GST Registration Requirements:**
• Mandatory for businesses with turnover > ₹20 lakhs
• Required documents: PAN, Aadhaar, business proof, bank details
• Registration process takes 3-7 working days
• GSTIN is issued upon successful registration

**GST Filing Deadlines:**
• GSTR-1: 11th of following month
• GSTR-3B: 20th of following month
• Annual Return: 31st December

**Penalties:**
• Late filing: ₹200 per day
• Interest: 18% per annum on tax amount
• Maximum penalty: ₹10,000 per return

**Best Practices:**
• Use GST software for filing
• Maintain proper records
• Set up automated reminders
• Consult with tax professionals

*Note: This is general information. Always consult with a qualified tax advisor.*`;
  }
  
  if (lowerMessage.includes('tds')) {
    return `For TDS compliance, here's the essential information:

**TDS Filing Requirements:**
• TDS returns must be filed quarterly
• Forms: 24Q (salary), 26Q (non-salary), 27Q (non-residents)
• Due dates: July 31, October 31, January 31, May 31

**TDS Rates:**
• Salary: As per income tax slabs
• Rent: 10% (if > ₹2.4 lakhs annually)
• Professional fees: 10%
• Interest: 10%

**Penalties:**
• Late filing: ₹200 per day
• Interest: 1.5% per month
• TDS certificate must be issued within 15 days

**Best Practices:**
• Use TDS software for calculations
• Maintain proper records
• Issue certificates on time
• File returns before due dates

*Note: TDS rates and rules may vary. Consult with a qualified tax professional.*`;
  }
  
  if (lowerMessage.includes('company')) {
    return `For company registration in India:

**Types of Companies:**
• Private Limited Company (most popular for startups)
• Public Limited Company
• One Person Company (OPC)
• Limited Liability Partnership (LLP)

**Registration Process:**
1. Name approval on MCA portal
2. Obtain DSC for directors
3. Apply for DIN
4. Prepare incorporation documents
5. File with ROC
6. Receive Certificate of Incorporation

**Required Documents:**
• PAN and Aadhaar of directors
• Address proof of registered office
• MOA and AOA
• Declaration by subscribers

**Timeline:** 7-15 days (if documents are correct)

**Post-Registration:**
• Get CIN number
• Open bank account
• Apply for GST registration
• Start business operations

*Note: Registration requirements may vary. Consult with a qualified professional.*`;
  }
  
  return `I'm here to help you with business and legal compliance matters. Here's some general guidance:

**Key Business Areas I Can Help With:**
• Company registration and compliance
• Tax filing and GST requirements
• Employment law and HR policies
• Legal document generation
• Regulatory compliance
• Business formation guidance

**Important Reminder:**
This is general information and should not be considered as legal advice. Always consult with qualified professionals for specific guidance.

**How I Can Help:**
• Answer questions about Indian business law
• Guide you through compliance requirements
• Help with document generation
• Provide step-by-step instructions
• Connect you with relevant resources

What specific aspect of your business would you like help with?`;
}

function generateSuggestions(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('gst') || lowerMessage.includes('tax')) {
    return [
      "How to file GSTR-1?",
      "What is the GST rate for my product?",
      "How to claim GST input credit?",
      "What are the GST penalties?"
    ];
  }
  
  if (lowerMessage.includes('tds')) {
    return [
      "TDS rates for different payments",
      "How to generate TDS certificate?",
      "TDS return filing process",
      "TDS due dates"
    ];
  }
  
  if (lowerMessage.includes('company') || lowerMessage.includes('registration')) {
    return [
      "What documents are needed for company registration?",
      "How to get CIN number?",
      "What is the incorporation process?",
      "ROC compliance requirements"
    ];
  }
  
  if (lowerMessage.includes('employment') || lowerMessage.includes('hr')) {
    return [
      "Employment agreement template",
      "HR policy requirements",
      "Labor law compliance",
      "Employee benefits"
    ];
  }
  
  if (lowerMessage.includes('compliance') || lowerMessage.includes('legal')) {
    return [
      "Monthly compliance checklist",
      "Annual compliance requirements",
      "Industry-specific regulations",
      "Penalty for non-compliance"
    ];
  }
  
  return [
    "Tell me more about this",
    "What are the next steps?",
    "How can I implement this?",
    "What documents do I need?"
  ];
}
