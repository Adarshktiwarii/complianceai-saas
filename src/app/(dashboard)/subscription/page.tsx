import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, CreditCard, Calendar } from 'lucide-react';

export default function SubscriptionPage() {
  // Mock data - in real app, this would come from API
  const currentPlan = {
    name: 'Growth',
    price: '₹7,999',
    period: 'month',
    features: [
      '25 documents/month',
      'All templates',
      'AI assistance',
      'Priority support',
      'Advanced compliance tracking'
    ],
    nextBilling: '2024-02-15',
    status: 'Active'
  };

  const plans = [
    {
      name: 'Starter',
      price: '₹2,999',
      period: 'month',
      features: [
        '5 documents/month',
        'Basic templates',
        'Email support',
        'GST compliance tracking'
      ],
      current: false
    },
    {
      name: 'Growth',
      price: '₹7,999',
      period: 'month',
      features: [
        '25 documents/month',
        'All templates',
        'AI assistance',
        'Priority support',
        'Advanced compliance tracking'
      ],
      current: true,
      popular: true
    },
    {
      name: 'Scale',
      price: '₹15,999',
      period: 'month',
      features: [
        'Unlimited documents',
        'Custom templates',
        '24/7 support',
        'Legal review',
        'Dedicated account manager'
      ],
      current: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="text-gray-600">Manage your subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Crown className="h-5 w-5 mr-2 text-blue-600" />
                Current Plan: {currentPlan.name}
              </CardTitle>
              <CardDescription>
                Next billing: {currentPlan.nextBilling}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{currentPlan.price}/{currentPlan.period}</div>
              <div className="text-sm text-green-600 font-medium">{currentPlan.status}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Plan Features:</h4>
              <ul className="space-y-1">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Update Payment Method
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View Billing History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">
                  {plan.price}<span className="text-lg text-gray-500">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <Button className="w-full bg-gray-500" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
