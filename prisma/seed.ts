import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create document templates
  const templates = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Employment Agreement',
      category: 'HR & Employment',
      description: 'Comprehensive employment contract for Indian companies',
      templateContent: `EMPLOYMENT AGREEMENT

This Employment Agreement is entered into on {date} between {companyName}, a company incorporated under the Companies Act, 2013, having its registered office at {companyAddress} (hereinafter referred to as "Company") and {employeeName}, residing at {employeeAddress} (hereinafter referred to as "Employee").

TERMS AND CONDITIONS:

1. APPOINTMENT
The Company hereby appoints the Employee as {designation} and the Employee accepts such appointment subject to the terms and conditions set forth herein.

2. SALARY AND BENEFITS
The Employee shall be paid a monthly salary of INR {salary} along with applicable benefits as per company policy.

3. DUTIES AND RESPONSIBILITIES
{jobDescription}

4. CONFIDENTIALITY
The Employee agrees to maintain strict confidentiality of all proprietary information.

5. TERMINATION
Either party may terminate this agreement with {noticePeriod} days written notice.

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.

{companyName}                    {employeeName}
By: _________________          _________________
Name: {signatoryName}           Employee Signature
Title: {signatoryTitle}
Date: _______________          Date: ___________`,
      requiredFields: {
        employeeName: { label: "Employee Name", type: "text", required: true },
        employeeAddress: { label: "Employee Address", type: "textarea", required: true },
        designation: { label: "Designation", type: "text", required: true },
        salary: { label: "Monthly Salary (INR)", type: "number", required: true },
        jobDescription: { label: "Job Description", type: "textarea", required: true },
        noticePeriod: { label: "Notice Period (days)", type: "number", required: true, default: 30 },
        signatoryName: { label: "Company Signatory Name", type: "text", required: true },
        signatoryTitle: { label: "Signatory Title", type: "text", required: true }
      },
      price: 999,
      complexityLevel: 'medium',
      estimatedTime: '10-15 minutes',
      legalCategory: 'Employment Law'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Non-Disclosure Agreement (NDA)',
      category: 'Legal & Contracts',
      description: 'Standard NDA for protecting confidential information',
      templateContent: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on {date} between:

DISCLOSING PARTY: {companyName}, having its registered office at {companyAddress}

RECEIVING PARTY: {recipientName}, {recipientAddress}

PURPOSE: {purpose}

1. CONFIDENTIAL INFORMATION
For purposes of this Agreement, "Confidential Information" means all non-public information disclosed by the Disclosing Party.

2. OBLIGATIONS
The Receiving Party agrees to:
- Keep all Confidential Information strictly confidential
- Use Confidential Information solely for the stated Purpose
- Not disclose Confidential Information to third parties

3. TERM
This Agreement shall remain in effect for {duration} years from the date of execution.

4. GOVERNING LAW
This Agreement shall be governed by the laws of India and subject to the jurisdiction of {jurisdiction} courts.

IN WITNESS WHEREOF, the parties execute this Agreement.

{companyName}                    {recipientName}
By: _________________          _________________
Name: {signatoryName}           Recipient Signature  
Title: {signatoryTitle}
Date: _______________          Date: ___________`,
      requiredFields: {
        recipientName: { label: "Recipient Name", type: "text", required: true },
        recipientAddress: { label: "Recipient Address", type: "textarea", required: true },
        purpose: { label: "Purpose of Disclosure", type: "textarea", required: true },
        duration: { label: "Duration (years)", type: "number", required: true, default: 2 },
        jurisdiction: { label: "Jurisdiction", type: "text", required: true, default: "Delhi" },
        signatoryName: { label: "Company Signatory Name", type: "text", required: true },
        signatoryTitle: { label: "Signatory Title", type: "text", required: true }
      },
      price: 799,
      complexityLevel: 'simple',
      estimatedTime: '5-10 minutes',
      legalCategory: 'Contract Law'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Service Agreement',
      category: 'Business Contracts',
      description: 'Professional service agreement template',
      templateContent: `SERVICE AGREEMENT

This Service Agreement is entered into on {date} between {companyName} ("Service Provider") and {clientName} ("Client").

1. SERVICES
Service Provider agrees to provide the following services: {serviceDescription}

2. TERM
This Agreement shall commence on {startDate} and continue until {endDate}.

3. COMPENSATION
Client agrees to pay INR {totalAmount} for the services, payable as follows: {paymentTerms}

4. DELIVERABLES
{deliverables}

5. INTELLECTUAL PROPERTY
All work products created under this Agreement shall belong to {ipOwner}.

6. TERMINATION
Either party may terminate with {terminationNotice} days written notice.

IN WITNESS WHEREOF, the parties execute this Agreement.

{companyName}                    {clientName}
_________________                _________________
Authorized Signatory             Client Signature`,
      requiredFields: {
        clientName: { label: "Client Name", type: "text", required: true },
        serviceDescription: { label: "Service Description", type: "textarea", required: true },
        startDate: { label: "Start Date", type: "date", required: true },
        endDate: { label: "End Date", type: "date", required: true },
        totalAmount: { label: "Total Amount (INR)", type: "number", required: true },
        paymentTerms: { label: "Payment Terms", type: "textarea", required: true },
        deliverables: { label: "Deliverables", type: "textarea", required: true },
        ipOwner: { 
          label: "IP Owner", 
          type: "select", 
          options: [
            { value: "Service Provider", label: "Service Provider" },
            { value: "Client", label: "Client" },
            { value: "Shared", label: "Shared" }
          ], 
          required: true 
        },
        terminationNotice: { label: "Termination Notice (days)", type: "number", required: true, default: 15 }
      },
      price: 1299,
      complexityLevel: 'medium',
      estimatedTime: '15-20 minutes',
      legalCategory: 'Contract Law'
    }
  ];

  for (const template of templates) {
    await prisma.documentTemplate.upsert({
      where: { id: template.id },
      update: template,
      create: template,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
