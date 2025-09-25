import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Shield, Zap, Users, DollarSign } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">ComplianceAI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Legal Compliance for
            <span className="text-blue-600"> Indian Startups</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Automate your legal compliance, generate professional documents, and stay compliant 
            with Indian regulations. Save 20+ hours/month and ₹50,000+ in legal fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ComplianceAI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>AI Document Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate professional legal documents in minutes with AI-powered templates 
                  tailored for Indian startups.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Automated Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Never miss a deadline with automated compliance tracking and calendar 
                  integration for GST, TDS, and more.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Legal AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant legal guidance and answers to your compliance questions 
                  with our AI-powered legal assistant.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <div className="text-3xl font-bold">₹2,999<span className="text-lg text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    5 documents/month
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 text-green-600 mr-2" />
                    Basic templates
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    Email support
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            {/* Growth Plan */}
            <Card className="relative border-blue-500">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Growth</CardTitle>
                <div className="text-3xl font-bold">₹7,999<span className="text-lg text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    25 documents/month
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 text-green-600 mr-2" />
                    All templates
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    AI assistance
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            {/* Scale Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-xl">Scale</CardTitle>
                <div className="text-3xl font-bold">₹15,999<span className="text-lg text-gray-500">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    Unlimited documents
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 text-green-600 mr-2" />
                    Custom templates
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    24/7 support
                  </li>
                  <li className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                    Legal review
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">ComplianceAI</span>
              </div>
              <p className="text-gray-400">
                AI-powered legal compliance for Indian startups.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Document Generation</li>
                <li>Compliance Tracking</li>
                <li>Legal Assistant</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Status</li>
                <li>Contact Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ComplianceAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
