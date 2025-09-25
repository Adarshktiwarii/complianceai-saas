import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from './db';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export const SUBSCRIPTION_PLANS = {
  starter: {
    name: 'Starter',
    price: 2999,
    features: ['5 documents/month', 'Basic templates', 'Email support'],
    documentsLimit: 5
  },
  growth: {
    name: 'Growth',
    price: 7999,
    features: ['25 documents/month', 'All templates', 'AI assistance', 'Priority support'],
    documentsLimit: 25
  },
  scale: {
    name: 'Scale',
    price: 15999,
    features: ['Unlimited documents', 'Custom templates', '24/7 support', 'Legal review'],
    documentsLimit: -1 // Unlimited
  }
};

export async function createSubscriptionOrder(
  companyId: string,
  planType: keyof typeof SUBSCRIPTION_PLANS
): Promise<any> {
  const plan = SUBSCRIPTION_PLANS[planType];
  if (!plan) {
    throw new Error('Invalid plan type');
  }
  
  const order = await razorpay.orders.create({
    amount: plan.price * 100, // Convert to paisa
    currency: 'INR',
    receipt: `order_${companyId}_${Date.now()}`,
    notes: {
      companyId,
      planType
    }
  });
  
  return order;
}

export async function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
    
  return expectedSignature === signature;
}

export async function createSubscription(
  companyId: string,
  planType: keyof typeof SUBSCRIPTION_PLANS,
  paymentId: string,
  orderId: string
): Promise<void> {
  const plan = SUBSCRIPTION_PLANS[planType];
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setMonth(endDate.getMonth() + 1);
  
  // Create subscription record
  await prisma.subscription.create({
    data: {
      companyId,
      planType,
      status: 'active',
      currentPeriodStart: currentDate,
      currentPeriodEnd: endDate,
      monthlyPrice: plan.price,
      documentsUsed: 0,
      documentsLimit: plan.documentsLimit
    }
  });
  
  // Create payment record
  await prisma.payment.create({
    data: {
      companyId,
      razorpayPaymentId: paymentId,
      razorpayOrderId: orderId,
      amount: plan.price,
      currency: 'INR',
      status: 'completed',
      description: `${plan.name} plan subscription`
    }
  });
}

export async function checkSubscriptionLimits(
  companyId: string
): Promise<{ canGenerate: boolean; documentsUsed: number; documentsLimit: number }> {
  const subscription = await prisma.subscription.findFirst({
    where: {
      companyId,
      status: 'active',
      currentPeriodEnd: {
        gte: new Date()
      }
    }
  });
  
  if (!subscription) {
    return { canGenerate: false, documentsUsed: 0, documentsLimit: 0 };
  }
  
  const canGenerate = subscription.documentsLimit === -1 || 
                     subscription.documentsUsed < subscription.documentsLimit;
  
  return {
    canGenerate,
    documentsUsed: subscription.documentsUsed,
    documentsLimit: subscription.documentsLimit
  };
}

export async function incrementDocumentUsage(companyId: string): Promise<void> {
  await prisma.subscription.updateMany({
    where: {
      companyId,
      status: 'active',
      currentPeriodEnd: {
        gte: new Date()
      }
    },
    data: {
      documentsUsed: {
        increment: 1
      }
    }
  });
}
