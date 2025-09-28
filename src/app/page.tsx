'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Shield, 
  Zap, 
  Brain, 
  FileText, 
  Clock, 
  Award,
  Play,
  ChevronRight,
  Sparkles,
  Target,
  TrendingUp,
  Globe,
  Lock,
  Heart,
  ThumbsUp,
  MessageCircle,
  BarChart3,
  Rocket,
  Crown,
  Diamond,
  Flame,
  Menu,
  X,
  ExternalLink,
  Download,
  BookOpen,
  Gavel,
  Scale,
  Building2,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Legal Assistant",
      description: "Get instant answers to complex legal questions with our advanced AI trained on Indian law",
      color: "from-purple-500 to-pink-500",
      benefits: ["24/7 Legal Support", "Instant Responses", "Context-Aware"]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Document Generation",
      description: "Generate legal documents in minutes with AI-powered templates and customization",
      color: "from-blue-500 to-cyan-500",
      benefits: ["100+ Templates", "Auto-Fill Data", "Legal Compliance"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Compliance Monitoring",
      description: "Stay compliant with automated tracking and alerts for regulatory requirements",
      color: "from-green-500 to-emerald-500",
      benefits: ["Real-time Alerts", "Deadline Tracking", "Risk Assessment"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Insights",
      description: "Get actionable insights into your compliance status and legal requirements",
      color: "from-orange-500 to-red-500",
      benefits: ["Compliance Score", "Trend Analysis", "Custom Reports"]
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Founder, TechStart India",
      company: "TechStart India",
      content: "ComplianceAI transformed our legal compliance process. We went from spending weeks on documentation to just hours.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "CEO, InnovateCorp",
      company: "InnovateCorp",
      content: "The AI assistant is incredibly smart. It understands our business context and provides relevant legal guidance.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Anita Patel",
      role: "Legal Head, GrowthTech",
      company: "GrowthTech",
      content: "Finally, a tool that makes legal compliance accessible for startups. The document generation is a game-changer.",
      rating: 5,
      avatar: "AP"
    }
  ];

  const pricingPlans = [
    {
      name: "Startup",
      price: "₹2,999",
      period: "/month",
      description: "Perfect for early-stage startups",
      features: [
        "AI Legal Assistant (50 queries/month)",
        "10 Document Templates",
        "Basic Compliance Tracking",
        "Email Support",
        "Mobile App Access"
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Growth",
      price: "₹7,999",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "AI Legal Assistant (200 queries/month)",
        "50+ Document Templates",
        "Advanced Compliance Monitoring",
        "Priority Support",
        "Team Collaboration",
        "Custom Workflows",
        "API Access"
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "border-blue-500"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited AI Queries",
        "All Document Templates",
        "Custom Compliance Rules",
        "Dedicated Support",
        "White-label Options",
        "Advanced Analytics",
        "Custom Integrations"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-gray-200"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Startups Trust Us", icon: <Users className="h-6 w-6" /> },
    { number: "50,000+", label: "Documents Generated", icon: <FileText className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <Shield className="h-6 w-6" /> },
    { number: "24/7", label: "AI Support", icon: <Brain className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ComplianceAI
                </span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Pricing
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Testimonials
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Pricing
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Testimonials
              </a>
              <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Contact
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                  Sign In
                </Link>
                <Link href="/register" className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">AI-Powered Legal Compliance for Indian Startups</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Navigate Legal Compliance with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your startup's legal compliance with our AI assistant. Generate documents, 
              track requirements, and stay compliant with Indian regulations - all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
                onClick={() => setIsVideoOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-3">
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Legal Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform handles all aspects of legal compliance, from document generation 
              to regulatory monitoring, designed specifically for Indian startups.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by 10,000+ Indian Startups
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about ComplianceAI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your startup's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} ${plan.color}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <Button 
                      className={`w-full py-3 text-lg ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Legal Compliance?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Indian startups who trust ComplianceAI for their legal needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              <Phone className="mr-2 h-5 w-5" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">ComplianceAI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The AI-powered legal compliance platform designed specifically for Indian startups. 
                Navigate complex regulations with confidence.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Mail className="h-4 w-4 mr-2" />
                  support@complianceai.com
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 ComplianceAI. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">ComplianceAI Demo</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsVideoOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Demo video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}