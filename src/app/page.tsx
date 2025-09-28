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
  CalendarCheck,
  BarChart3,
  Globe,
  Lock,
  Play,
  ChevronRight,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Mail,
  Phone,
  Menu,
  X
} from 'lucide-react';

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Legal Assistant",
      description: "Get instant, accurate answers to complex legal questions with our AI-powered assistant, tailored for Indian regulations.",
      benefits: ["24/7 Legal Support", "Instant Responses", "Context-Aware"]
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Smart Document Generation",
      description: "Generate over 100+ legal documents like MoUs, NDAs, and employment contracts in minutes, pre-filled with your company data.",
      benefits: ["100+ Templates", "Auto-Fill Data", "Legal Compliance"]
    },
    {
      icon: <CalendarCheck className="h-6 w-6" />,
      title: "Automated Compliance Monitoring",
      description: "Stay ahead with real-time alerts for upcoming deadlines, regulatory changes, and automated task management.",
      benefits: ["Real-time Alerts", "Deadline Tracking", "Risk Assessment"]
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics & Insights",
      description: "Gain valuable insights into your compliance posture with detailed reports, risk assessments, and performance metrics.",
      benefits: ["Compliance Score", "Trend Analysis", "Custom Reports"]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Security & Privacy",
      description: "Your sensitive legal data is protected with enterprise-grade encryption and strict privacy protocols.",
      benefits: ["Enterprise Encryption", "GDPR Compliance", "Secure Storage"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "India-Specific Compliance",
      description: "Expertly designed to navigate the intricacies of Indian legal and regulatory frameworks for startups.",
      benefits: ["Indian Law Focus", "GST Compliance", "Company Law"]
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      title: "CEO, TechInnovate",
      quote: "Kavach.ai has revolutionized how we handle legal compliance. The AI assistant is a game-changer!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PS"
    },
    {
      name: "Rahul Singh",
      title: "Founder, GrowFast",
      quote: "Document generation is incredibly fast and accurate. We save hours every week. Highly recommended!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RS"
    },
    {
      name: "Anjali Mehta",
      title: "Legal Head, FutureCorp",
      quote: "The compliance monitoring feature ensures we never miss a deadline. It's like having a legal team on autopilot.",
      rating: 4,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AM"
    },
  ];

  const pricingPlans = [
    {
      name: "Startup",
      price: "₹1,999",
      frequency: "/month",
      description: "Essential compliance for early-stage startups.",
      features: [
        "AI Legal Assistant (Basic)",
        "5 Document Generations/month",
        "Basic Compliance Monitoring",
        "Email Support"
      ],
      isPopular: false,
    },
    {
      name: "Growth",
      price: "₹4,999",
      frequency: "/month",
      description: "Comprehensive compliance for growing businesses.",
      features: [
        "AI Legal Assistant (Advanced)",
        "Unlimited Document Generations",
        "Advanced Compliance Monitoring",
        "Priority Email & Chat Support",
        "Customizable Workflows",
        "Analytics & Reporting"
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      frequency: "",
      description: "Tailored solutions for large organizations.",
      features: [
        "Dedicated AI Legal Expert",
        "Unlimited Everything",
        "Dedicated Account Manager",
        "On-premise Deployment Option",
        "API Access",
        "24/7 Phone Support"
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-slate-900 hover:text-slate-700 transition-colors">
            <Shield className="h-6 w-6 text-slate-600" />
            <span>Kavach.ai</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Features</Link>
            <Link href="#testimonials" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Testimonials</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Pricing</Link>
            <Link href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Contact</Link>
            <Link href="/login" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Sign In</Link>
            <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-md">
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 hover:text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
              <Link href="#features" className="block text-slate-600 hover:text-slate-900 transition-colors font-medium">Features</Link>
              <Link href="#testimonials" className="block text-slate-600 hover:text-slate-900 transition-colors font-medium">Testimonials</Link>
              <Link href="#pricing" className="block text-slate-600 hover:text-slate-900 transition-colors font-medium">Pricing</Link>
              <Link href="#contact" className="block text-slate-600 hover:text-slate-900 transition-colors font-medium">Contact</Link>
              <Link href="/login" className="block text-slate-600 hover:text-slate-900 transition-colors font-medium">Sign In</Link>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-md">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm mb-8 inline-flex items-center">
            <Sparkles className="h-4 w-4 mr-2" /> AI-Powered Legal Compliance for Indian Startups
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-slate-900 max-w-5xl mx-auto">
            Navigate Legal Compliance with <br className="hidden md:inline"/> AI-Powered Intelligence
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Kavach.ai is your all-in-one platform for automated legal document generation, AI-powered legal assistance, and proactive compliance monitoring, specifically designed for the Indian startup ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-md text-lg font-medium">
              <Link href="/register">Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-md text-lg font-medium"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-slate-500 mr-3" />
              <span className="font-medium">10,000+ Startups Trust Us</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-slate-500 mr-3" />
              <span className="font-medium">50,000+ Documents Generated</span>
            </div>
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-slate-500 mr-3" />
              <span className="font-medium">99.9% Uptime Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-white rounded-lg shadow-xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 text-white text-2xl font-bold p-2 hover:text-gray-300 transition-colors"
            >
              &times;
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Kavach.ai Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Powerful Features Designed for You
          </h2>
          <p className="text-lg text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            From AI-powered legal assistance to automated compliance, Kavach.ai equips you with the tools to navigate India's legal landscape with confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border border-slate-200 text-slate-900 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6"
              >
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-slate-600">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 mb-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3 text-sm text-slate-500">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
                        <span className="font-medium">{benefit}</span>
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
      <section id="testimonials" className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            Hear from the Indian startups who are thriving with Kavach.ai.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white border border-slate-200 text-slate-900 rounded-lg shadow-sm p-8 hover:shadow-md transition-all duration-300"
              >
                <CardContent className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 border-2 border-slate-200"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-slate-900 text-lg">{testimonial.name}</p>
                      <p className="text-slate-500">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            Choose the plan that best fits your startup's needs. No hidden fees, just clear value.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-white border text-slate-900 rounded-lg shadow-sm p-8 hover:shadow-md transition-all duration-300 ${plan.isPopular ? 'border-slate-900 shadow-lg' : 'border-slate-200'}`}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-4">
                    {plan.name}
                  </CardTitle>
                  <p className="text-slate-600 mb-6">{plan.description}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">
                    {plan.price}
                    {plan.frequency && <span className="text-lg font-normal text-slate-500">{plan.frequency}</span>}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-4 text-left text-slate-600 flex-grow mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <CheckCircle className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full py-3 rounded-md text-lg font-medium ${
                    plan.isPopular 
                      ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                      : 'bg-slate-100 border border-slate-300 text-slate-900 hover:bg-slate-200'
                  }`}>
                    <Link href="/register">
                      {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-slate-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Simplify Your Compliance?
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of Indian startups who are already leveraging Kavach.ai to grow confidently.
          </p>
          <Button asChild className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-md text-lg font-medium">
            <Link href="/register">Get Started Free <ChevronRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-100 py-16 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-slate-900 hover:text-slate-700 transition-colors">
              <Shield className="h-6 w-6 text-slate-600" />
              <span>Kavach.ai</span>
            </Link>
            <p className="text-slate-500 leading-relaxed">Your trusted partner for legal compliance in India.</p>
            <div className="flex flex-col space-y-3">
              <Button asChild variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50 justify-start">
                <Link href="mailto:support@kavach.ai">
                  <Mail className="h-4 w-4 mr-2" />
                  support@kavach.ai
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50 justify-start">
                <Link href="tel:+919876543210">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-900">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Features</Link></li>
              <li><Link href="#pricing" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Pricing</Link></li>
              <li><Link href="/documents" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Documentation</Link></li>
              <li><Link href="/api" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-900">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">About</Link></li>
              <li><Link href="/blog" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Blog</Link></li>
              <li><Link href="/careers" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Careers</Link></li>
              <li><Link href="#contact" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-900">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Cookie Policy</Link></li>
              <li><Link href="/security" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 mt-12 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-500 text-sm">© 2024 Kavach.ai. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">Privacy Policy</Link>
                <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">Terms of Service</Link>
                <Link href="/cookies" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}