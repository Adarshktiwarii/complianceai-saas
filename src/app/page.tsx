'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  ArrowUpRight,
  Bot,
  Code,
  Database,
  Layers,
  Palette,
  Wand2,
  Eye,
  Search,
  Filter,
  Settings,
  Bell,
  User,
  LogOut,
  Plus,
  Minus,
  RefreshCw,
  Loader2
} from 'lucide-react';

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Legal Assistant",
      description: "Get instant, accurate answers to complex legal questions with our AI-powered assistant, tailored for Indian regulations.",
      color: "from-purple-500 via-pink-500 to-red-500",
      gradient: "bg-gradient-to-br from-purple-100 via-pink-50 to-red-50",
      border: "border-purple-200",
      benefits: ["24/7 Legal Support", "Instant Responses", "Context-Aware"]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Document Generation",
      description: "Generate over 100+ legal documents like MoUs, NDAs, and employment contracts in minutes, pre-filled with your company data.",
      color: "from-blue-500 via-cyan-500 to-teal-500",
      gradient: "bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50",
      border: "border-blue-200",
      benefits: ["100+ Templates", "Auto-Fill Data", "Legal Compliance"]
    },
    {
      icon: <CalendarCheck className="h-8 w-8" />,
      title: "Automated Compliance Monitoring",
      description: "Stay ahead with real-time alerts for upcoming deadlines, regulatory changes, and automated task management.",
      color: "from-green-500 via-emerald-500 to-teal-500",
      gradient: "bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50",
      border: "border-green-200",
      benefits: ["Real-time Alerts", "Deadline Tracking", "Risk Assessment"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Insights",
      description: "Gain valuable insights into your compliance posture with detailed reports, risk assessments, and performance metrics.",
      color: "from-orange-500 via-amber-500 to-yellow-500",
      gradient: "bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-50",
      border: "border-orange-200",
      benefits: ["Compliance Score", "Trend Analysis", "Custom Reports"]
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Data Security & Privacy",
      description: "Your sensitive legal data is protected with enterprise-grade encryption and strict privacy protocols.",
      color: "from-red-500 via-rose-500 to-pink-500",
      gradient: "bg-gradient-to-br from-red-100 via-rose-50 to-pink-50",
      border: "border-red-200",
      benefits: ["Enterprise Encryption", "GDPR Compliance", "Secure Storage"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "India-Specific Compliance",
      description: "Expertly designed to navigate the intricacies of Indian legal and regulatory frameworks for startups.",
      color: "from-indigo-500 via-purple-500 to-violet-500",
      gradient: "bg-gradient-to-br from-indigo-100 via-purple-50 to-violet-50",
      border: "border-indigo-200",
      benefits: ["Indian Law Focus", "GST Compliance", "Company Law"]
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      title: "CEO, TechInnovate",
      quote: "Kavach.ai has revolutionized how we handle legal compliance. The AI assistant is a game-changer!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PS",
      company: "TechInnovate"
    },
    {
      name: "Rahul Singh",
      title: "Founder, GrowFast",
      quote: "Document generation is incredibly fast and accurate. We save hours every week. Highly recommended!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RS",
      company: "GrowFast"
    },
    {
      name: "Anjali Mehta",
      title: "Legal Head, FutureCorp",
      quote: "The compliance monitoring feature ensures we never miss a deadline. It's like having a legal team on autopilot.",
      rating: 4,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AM",
      company: "FutureCorp"
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
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
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
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      borderColor: "border-blue-300"
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
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: `${mousePosition.x * 0.01}px`,
            bottom: `${mousePosition.y * 0.01}px`,
            transform: 'translate(50%, 50%)'
          }}
        />
      </div>

      {/* Navbar */}
      <header className="relative z-40 w-full bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-3 font-bold text-2xl text-gray-900 hover:text-blue-600 transition-all duration-300 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Kavach.ai</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium hover:scale-105 transform">Features</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium hover:scale-105 transform">Testimonials</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium hover:scale-105 transform">Pricing</Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium hover:scale-105 transform">Contact</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium hover:scale-105 transform">Sign In</Link>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20">
            <div className="px-4 py-6 space-y-4">
              <Link href="#features" className="block text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium">Features</Link>
              <Link href="#testimonials" className="block text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium">Testimonials</Link>
              <Link href="#pricing" className="block text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium">Pricing</Link>
              <Link href="#contact" className="block text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium">Contact</Link>
              <Link href="/login" className="block text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium">Sign In</Link>
              <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-2 rounded-full text-md mb-6 animate-bounce">
            <Sparkles className="h-4 w-4 mr-2" /> AI-Powered Legal Compliance for Indian Startups
          </Badge>
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
            Navigate Legal Compliance with <br className="hidden md:inline"/> AI-Powered Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Kavach.ai is your all-in-one platform for automated legal document generation, AI-powered legal assistance, and proactive compliance monitoring, specifically designed for the Indian startup ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/25">
              <Link href="/register">Start Free Trial <ArrowRight className="ml-3 h-6 w-6" /></Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-full text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-blue-50 hover:shadow-blue-500/25"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="mr-3 h-6 w-6" /> Watch Demo
            </Button>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-12">
            <div className="flex items-center text-gray-700 text-xl font-medium">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <span>10,000+ Startups Trust Us</span>
            </div>
            <div className="flex items-center text-gray-700 text-xl font-medium">
              <FileText className="h-8 w-8 text-purple-600 mr-3" />
              <span>50,000+ Documents Generated</span>
            </div>
            <div className="flex items-center text-gray-700 text-xl font-medium">
              <Zap className="h-8 w-8 text-green-600 mr-3" />
              <span>99.9% Uptime Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white text-4xl font-bold p-2 hover:text-gray-300 transition-colors z-10"
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
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
            Powerful Features Designed for You
          </h2>
          <p className="text-xl text-gray-600 mb-20 max-w-4xl mx-auto">
            From AI-powered legal assistance to automated compliance, Kavach.ai equips you with the tools to navigate India's legal landscape with confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`${feature.gradient} ${feature.border} text-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 group cursor-pointer border-2`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-3 w-full">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-gray-600 text-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 mb-20 max-w-4xl mx-auto">
            Hear from the Indian startups who are thriving with Kavach.ai.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white/80 backdrop-blur-sm border border-white/20 text-gray-900 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <CardContent className="flex flex-col items-center text-center space-y-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-6 w-6 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-xl italic text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full border-4 border-blue-500 shadow-lg"
                    />
                    <div className="text-left">
                      <p className="font-bold text-xl text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-lg">{testimonial.title}</p>
                      <p className="text-blue-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-20 max-w-4xl mx-auto">
            Choose the plan that best fits your startup's needs. No hidden fees, just clear value.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.bgColor} ${plan.borderColor} text-gray-900 rounded-2xl shadow-xl p-8 flex flex-col transform hover:scale-105 transition-all duration-500 border-2 ${plan.isPopular ? 'ring-4 ring-blue-500/20 shadow-2xl' : ''}`}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg">
                    Most Popular
                  </Badge>
                )}
                <div className="text-center pb-8">
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-xl mb-6">{plan.description}</p>
                  <p className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {plan.price}
                    {plan.frequency && <span className="text-2xl font-medium text-gray-600">{plan.frequency}</span>}
                  </p>
                </div>
                <div className="flex-grow flex flex-col">
                  <ul className="space-y-4 text-left text-gray-600 flex-grow mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-lg">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full py-4 rounded-full text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 ${
                    plan.isPopular 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white' 
                      : 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}>
                    <Link href="/register">
                      {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Ready to Simplify Your Compliance?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Join thousands of Indian startups who are already leveraging Kavach.ai to grow confidently.
          </p>
          <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 rounded-full text-2xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Link href="/register">Get Started Free <ChevronRight className="ml-3 h-8 w-8" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 py-16 text-gray-300">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 font-bold text-3xl text-white hover:text-blue-400 transition-colors">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Kavach.ai</span>
            </Link>
            <p className="text-gray-400 text-lg">Your trusted partner for legal compliance in India.</p>
            <div className="flex space-x-4">
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link href="mailto:support@kavach.ai">
                  <Mail className="h-5 w-5 mr-2" />
                  support@kavach.ai
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link href="tel:+919876543210">
                  <Phone className="h-5 w-5 mr-2" />
                  +91 98765 43210
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors text-lg">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors text-lg">Pricing</Link></li>
              <li><Link href="/documents" className="text-gray-400 hover:text-white transition-colors text-lg">Documentation</Link></li>
              <li><Link href="/api" className="text-gray-400 hover:text-white transition-colors text-lg">API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-lg">About</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-lg">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-lg">Careers</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors text-lg">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-lg">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-lg">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-lg">Cookie Policy</Link></li>
              <li><Link href="/security" className="text-gray-400 hover:text-white transition-colors text-lg">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg">© 2024 Kavach.ai. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-lg">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-lg">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-lg">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}