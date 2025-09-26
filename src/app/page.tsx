'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Shield, Zap, Users, DollarSign, Check, ArrowRight, Play, Star, TrendingUp, Clock, Award } from 'lucide-react';

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">ComplianceAI</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 500+ Indian Startups
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Legal Compliance for
            <span className="text-blue-600"> Indian Startups</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Automate your legal compliance, generate professional documents, and stay compliant 
            with Indian regulations. Save 20+ hours/month and ₹50,000+ in legal fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-colors group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 hover:bg-blue-50 hover:border-blue-300 transition-colors group"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Startups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">₹50L+</div>
              <div className="text-sm text-gray-600">Saved in Legal Fees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-sm text-gray-600">Hours Saved/Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-sm text-gray-600">Compliance Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose ComplianceAI?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay compliant with Indian regulations, powered by AI
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-xl">AI Document Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Generate professional legal documents in minutes with AI-powered templates 
                  tailored for Indian startups.
                </CardDescription>
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  ✓ 50+ Document Templates
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                  <Calendar className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-xl">Automated Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Never miss a deadline with automated compliance tracking and calendar 
                  integration for GST, TDS, and more.
                </CardDescription>
                <div className="mt-4 text-sm text-green-600 font-medium">
                  ✓ Real-time Alerts
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                  <Zap className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Legal AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get instant legal guidance and answers to your compliance questions 
                  with our AI-powered legal assistant.
                </CardDescription>
                <div className="mt-4 text-sm text-purple-600 font-medium">
                  ✓ 24/7 Support
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your startup's needs. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <div className="text-3xl font-bold">₹2,999<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-sm text-gray-600">Perfect for early-stage startups</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>5 documents/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>GST compliance tracking</span>
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 transition-colors">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Growth Plan */}
            <Card className="relative border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Growth</CardTitle>
                <div className="text-3xl font-bold">₹7,999<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-sm text-gray-600">Best for growing startups</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>25 documents/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>All templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>AI assistance</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Advanced compliance tracking</span>
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Scale Plan */}
            <Card className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-xl">Scale</CardTitle>
                <div className="text-3xl font-bold">₹15,999<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-sm text-gray-600">For established companies</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Unlimited documents</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Custom templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>24/7 support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Legal review</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 transition-colors">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                No setup fees
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join hundreds of Indian startups who trust ComplianceAI for their legal needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "ComplianceAI saved us ₹2 lakhs in legal fees and 15 hours per month. 
                  The AI document generation is incredibly accurate."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">RK</span>
                  </div>
                  <div>
                    <div className="font-semibold">Rajesh Kumar</div>
                    <div className="text-sm text-gray-500">CEO, TechStart India</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The compliance tracking feature is a game-changer. We never miss GST deadlines anymore."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">SP</span>
                  </div>
                  <div>
                    <div className="font-semibold">Priya Sharma</div>
                    <div className="text-sm text-gray-500">CFO, InnovateLabs</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The AI assistant answers all our legal questions instantly. It's like having a lawyer on call 24/7."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">AM</span>
                  </div>
                  <div>
                    <div className="font-semibold">Amit Mehta</div>
                    <div className="text-sm text-gray-500">Founder, StartupHub</div>
                  </div>
                </div>
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
              <p className="text-gray-400 mb-4">
                AI-powered legal compliance for Indian startups.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/documents" className="hover:text-white transition-colors">Document Generation</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance Tracking</Link></li>
                <li><Link href="/assistant" className="hover:text-white transition-colors">Legal Assistant</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2024 ComplianceAI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">ComplianceAI Demo</h3>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Demo video coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Watch how ComplianceAI can transform your legal compliance process
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
