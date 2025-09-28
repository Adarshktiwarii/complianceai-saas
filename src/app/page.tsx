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
  Lightbulb,
  Scale,
  Briefcase,
  DollarSign,
  CalendarCheck,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ExternalLink,
  Download,
  BookOpen,
  Gavel,
  Building2,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-white" />,
      title: "AI Legal Assistant",
      description: "Get instant, accurate answers to complex legal questions with our AI-powered assistant, tailored for Indian regulations.",
      color: "from-purple-500 to-pink-500",
      features: ["24/7 Legal Support", "Instant Responses", "Context-Aware"]
    },
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      title: "Smart Document Generation",
      description: "Generate over 100+ legal documents like MoUs, NDAs, and employment contracts in minutes, pre-filled with your company data.",
      color: "from-blue-500 to-cyan-500",
      features: ["100+ Templates", "Auto-Fill Data", "Legal Compliance"]
    },
    {
      icon: <CalendarCheck className="h-8 w-8 text-white" />,
      title: "Automated Compliance Monitoring",
      description: "Stay ahead with real-time alerts for upcoming deadlines, regulatory changes, and automated task management.",
      color: "from-green-500 to-teal-500",
      features: ["Real-time Alerts", "Deadline Tracking", "Risk Assessment"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: "Analytics & Insights",
      description: "Gain valuable insights into your compliance posture with detailed reports, risk assessments, and performance metrics.",
      color: "from-yellow-500 to-orange-500",
      features: ["Compliance Score", "Trend Analysis", "Custom Reports"]
    },
    {
      icon: <Lock className="h-8 w-8 text-white" />,
      title: "Data Security & Privacy",
      description: "Your sensitive legal data is protected with enterprise-grade encryption and strict privacy protocols.",
      color: "from-red-500 to-rose-500",
      features: ["Enterprise Encryption", "GDPR Compliance", "Secure Storage"]
    },
    {
      icon: <Globe className="h-8 w-8 text-white" />,
      title: "India-Specific Compliance",
      description: "Expertly designed to navigate the intricacies of Indian legal and regulatory frameworks for startups.",
      color: "from-indigo-500 to-violet-500",
      features: ["Indian Law Focus", "GST Compliance", "Company Law"]
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2 font-bold text-2xl text-white hover:text-gray-200 transition-colors">
            <Shield className="h-7 w-7 text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Kavach.ai</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors text-lg">Features</Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors text-lg">Testimonials</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors text-lg">Pricing</Link>
            <Link href="#contact" className="text-gray-300 hover:text-white transition-colors text-lg">Contact</Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors text-lg">Sign In</Link>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700">
            <div className="px-4 py-4 space-y-4">
              <Link href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="#testimonials" className="block text-gray-300 hover:text-white transition-colors">Testimonials</Link>
              <Link href="#pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="#contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
              <Link href="/login" className="block text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.svg')" }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Badge variant="secondary" className="bg-blue-500 text-white px-4 py-1 rounded-full text-md mb-4 animate-fade-in-down">
            <Sparkles className="h-4 w-4 mr-2" /> AI-Powered Legal Compliance for Indian Startups
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Navigate Legal Compliance with <br className="hidden md:inline"/> AI-Powered Intelligence
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Kavach.ai is your all-in-one platform for automated legal document generation, AI-powered legal assistance, and proactive compliance monitoring, specifically designed for the Indian startup ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up delay-400">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
              <Link href="/register">Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-white bg-opacity-10 border border-gray-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-opacity-20"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-in-up delay-600">
            <div className="flex items-center text-gray-300 text-lg">
              <Users className="h-6 w-6 text-blue-400 mr-2" />
              <span>10,000+ Startups Trust Us</span>
            </div>
            <div className="flex items-center text-gray-300 text-lg">
              <FileText className="h-6 w-6 text-purple-400 mr-2" />
              <span>50,000+ Documents Generated</span>
            </div>
            <div className="flex items-center text-gray-300 text-lg">
              <Zap className="h-6 w-6 text-green-400 mr-2" />
              <span>99.9% Uptime Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-lg shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold p-2 hover:text-gray-300 transition-colors"
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
      <section id="features" className="py-20 md:py-28 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 animate-fade-in-up">
            Powerful Features Designed for You
          </h2>
          <p className="text-lg text-gray-400 mb-16 max-w-3xl mx-auto animate-fade-in-up delay-100">
            From AI-powered legal assistance to automated compliance, Kavach.ai equips you with the tools to navigate India's legal landscape with confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`bg-gray-700 border border-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up delay-${index * 100 + 200}`}
              >
                <CardHeader className="flex flex-row items-center space-x-4 p-6">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400 group-hover:from-blue-200 group-hover:to-purple-300 transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 animate-fade-in-up">
            Your Path to Seamless Compliance
          </h2>
          <p className="text-lg text-gray-400 mb-16 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Experience a streamlined approach to legal compliance with Kavach.ai's intuitive workflow.
          </p>
          <div className="relative flex flex-col items-center">
            <div className="absolute hidden md:block h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 left-1/2 transform -translate-x-1/2 z-0"></div>
            
            <div className="flex flex-col md:flex-row items-center w-full mb-16 animate-fade-in-left">
              <div className="md:w-1/2 text-right md:pr-12 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">
                  1. Onboard & Configure
                </h3>
                <p className="text-gray-300 text-lg">
                  Quickly set up your company profile and let our AI understand your specific compliance needs.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-start md:justify-end">
                <div className="p-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-700">
                  <Rocket className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center w-full mb-16 animate-fade-in-right">
              <div className="md:w-1/2 text-left md:pl-12 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400">
                  2. Generate & Automate
                </h3>
                <p className="text-gray-300 text-lg">
                  Utilize AI to generate legal documents and automate routine compliance tasks effortlessly.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-end md:justify-start">
                <div className="p-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-700">
                  <Zap className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center w-full animate-fade-in-left">
              <div className="md:w-1/2 text-right md:pr-12 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-400">
                  3. Monitor & Grow
                </h3>
                <p className="text-gray-300 text-lg">
                  Continuously monitor your compliance status and receive proactive insights to support your growth.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-start md:justify-end">
                <div className="p-5 rounded-full bg-gradient-to-br from-green-500 to-teal-500 shadow-xl flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-700">
                  <TrendingUp className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-28 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 animate-fade-in-up">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-400 mb-16 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Hear from the Indian startups who are thriving with Kavach.ai.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className={`bg-gray-700 border border-gray-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up delay-${index * 100 + 200}`}
              >
                <CardContent className="flex flex-col items-center text-center">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-lg italic text-gray-200 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
                    />
                    <div>
                      <p className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500 animate-fade-in-up">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-400 mb-16 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Choose the plan that best fits your startup's needs. No hidden fees, just clear value.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-gray-700 border border-gray-600 text-white rounded-xl shadow-lg p-8 flex flex-col transform hover:scale-105 transition-all duration-300 ${plan.isPopular ? 'border-blue-500 shadow-blue-500/30' : ''} animate-fade-in-up delay-${index * 100 + 200}`}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400 mb-2">
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-400 text-lg">{plan.description}</p>
                  <p className="mt-4 text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                    {plan.price}
                    {plan.frequency && <span className="text-xl font-medium text-gray-400">{plan.frequency}</span>}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-3 text-left text-gray-300 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-lg">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`mt-8 w-full py-3 rounded-full text-lg font-semibold shadow-md transform hover:scale-105 transition-all duration-300 ${
                    plan.isPopular 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white' 
                      : 'bg-white bg-opacity-10 border border-gray-600 text-white hover:bg-opacity-20'
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
      <section className="py-20 md:py-28 bg-gray-800 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-500 animate-fade-in-up">
            Ready to Simplify Your Compliance?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Join thousands of Indian startups who are already leveraging Kavach.ai to grow confidently.
          </p>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-200">
            <Link href="/register">Get Started Free <ChevronRight className="ml-2 h-6 w-6" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 py-12 text-gray-400">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 font-bold text-2xl text-white hover:text-gray-200 transition-colors">
              <Shield className="h-7 w-7 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Kavach.ai</span>
            </Link>
            <p className="text-gray-500">Your trusted partner for legal compliance in India.</p>
            <div className="flex space-x-4">
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link href="mailto:support@kavach.ai">
                  <Mail className="h-4 w-4 mr-2" />
                  support@kavach.ai
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link href="tel:+919876543210">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/documents" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Kavach.ai. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}