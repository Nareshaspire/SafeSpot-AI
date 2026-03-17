/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Zap, 
  Layers, 
  Users, 
  BarChart3,
  Menu,
  X,
  ChevronRight,
  Search,
  BookOpen,
  Code2,
  Mail,
  Phone,
  MapPin,
  Quote,
  Star,
  MessageSquare,
  Bot,
  Send,
  Loader2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Lazy Loaded Sections ---
const Services = lazy(() => import('./sections/Services'));
const Lifecycle = lazy(() => import('./sections/Lifecycle'));
const ResearchSection = lazy(() => import('./sections/ResearchSection'));
const PPESection = lazy(() => import('./sections/PPESection'));

// --- Components ---

const SectionLoading = () => (
  <div className="py-24 flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="animate-spin text-emerald-600" size={40} />
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Section...</p>
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
            <Shield size={24} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">AEGIS <span className="text-emerald-600">AI</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'AI Lifecycle', 'Research', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-all hover:shadow-lg hover:shadow-emerald-200">
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-slate-200 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {['Services', 'AI Lifecycle', 'Research', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-lg font-medium text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <a href="#contact" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold mt-2 text-center" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} />
            <span>Next-Gen Health & Safety</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
            Safety First. <br />
            <span className="text-gradient">AI Always.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
            We empower global organizations with intelligent health and safety applications. From predictive risk assessment to full-lifecycle AI integration, we build the future of workplace security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all hover:shadow-xl hover:shadow-emerald-200 group">
              Explore Solutions
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              AI Consulting
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6 grayscale opacity-60">
            <div className="flex items-center gap-2 font-display font-bold text-slate-400">
              <Globe size={20} />
              <span>GLOBAL REACH</span>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-400">
              <Shield size={20} />
              <span>ISO CERTIFIED</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
              alt="Industrial AI Safety" 
              className="w-full h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Real-time Monitoring</h4>
                  <p className="text-xs text-white/80">AI-driven risk detection active</p>
                </div>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-emerald-400"
                />
              </div>
            </div>
          </div>
          
          {/* Floating Element */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-6 rounded-2xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-emerald-500" size={20} />
              <span className="text-sm font-bold">Predictive Safety</span>
            </div>
            <p className="text-xs text-slate-500">Reducing incidents by up to 40% <br />using IEEE-standard models.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const testimonials = [
    {
      quote: "Aegis AI transformed our site safety audits. We've seen a 35% reduction in near-miss incidents since implementing their training tracking platform.",
      author: "Robert Chen",
      role: "Director of Safety, Northern Mining Group",
      avatar: "https://picsum.photos/seed/safety1/100/100"
    },
    {
      quote: "The full-lifecycle AI integration was seamless. Their team understands the unique challenges of construction logistics like no one else.",
      author: "Sarah Miller",
      role: "Operations Manager, Ontario Build Corp",
      avatar: "https://picsum.photos/seed/safety2/100/100"
    }
  ];

  const logos = [
    { name: "Global Mining", icon: <Activity size={24} /> },
    { name: "Sudbury Logistics", icon: <Globe size={24} /> },
    { name: "Ontario Build", icon: <Shield size={24} /> },
    { name: "HealthSafe Systems", icon: <Activity size={24} /> },
    { name: "EcoWaste Solutions", icon: <Zap size={24} /> }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logos */}
        <div className="mb-20">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale">
            {logos.map((logo, i) => (
              <div key={i} className="flex items-center gap-2 group cursor-default">
                <div className="text-slate-900">{logo.icon}</div>
                <span className="font-display font-bold text-lg tracking-tight text-slate-900">{logo.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="glass p-10 rounded-[32px] border-slate-200 shadow-sm relative"
            >
              <Quote className="absolute top-8 right-8 text-emerald-100" size={48} />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mb-8 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="font-bold text-slate-900">{t.author}</h5>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', industry: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl font-bold mb-6 text-slate-900">Get in Touch</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Ready to implement next-generation safety AI? Our team of experts is here to help you navigate the full lifecycle of AI integration.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Email Us</h5>
                  <p className="text-slate-600">contact@aegis-ai.ca</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Call Us</h5>
                  <p className="text-slate-600">+1 (705) 555-0123</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Office</h5>
                  <p className="text-slate-600">Sudbury, Ontario, Canada</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 md:p-10 rounded-[32px] shadow-xl border-slate-100 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Industry</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all appearance-none bg-white"
                      value={formState.industry}
                      onChange={(e) => setFormState({...formState, industry: e.target.value})}
                    >
                      <option value="">Select Industry</option>
                      <option value="mining">Mining</option>
                      <option value="construction">Construction</option>
                      <option value="logistics">Logistics</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group">
                    Send Inquiry
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for reaching out. Our safety experts will contact you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-emerald-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm the Aegis AI Assistant. How can I help you with your health and safety AI needs today? Ask me about our Health & Safety applications, AI integration services, or our IEEE-standard research!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  const suggestions = [
    "H&S Applications",
    "AI Integration",
    "IEEE Standards",
    "Industry Focus"
  ];

  const handleSuggestionClick = async (suggestion: string) => {
    if (isLoading) return;
    const message = `Tell me more about ${suggestion}`;
    setMessages(prev => [...prev, { role: 'user', text: message }]);
    await sendMessage(message);
  };

  const sendMessage = async (messageText: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messageText,
        config: {
          systemInstruction: `You are the Aegis AI Assistant, an expert in AI-driven health and safety solutions. 
          Your goal is to help users understand Aegis AI & Safety's services and AI implementation strategies.
          
          Key Knowledge:
          - Services: H&S Applications (Incident Reporting, Compliance Tracking, Audit Automation), AI Implementation (Computer Vision, Predictive Analytics, NLP), Lifecycle Management (Strategy, Design, Deployment, Optimization).
          - Research: Rooted in IEEE research (IEEE 7000, 7001, 2846) for transparency and ethical AI.
          - Industry Focus: Mining, Construction, Logistics, and Healthcare.
          - Tone: Professional, authoritative, helpful, and safety-focused.
          - Location: Based in Sudbury, Ontario, Canada.
          
          Always prioritize safety and ethical AI implementation in your answers. If you don't know something specific about a user's company, offer to connect them with a human safety expert via the contact form.`
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that request. Please try again or contact our team.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setLastUserMessage(null);
    } catch (err: any) {
      console.error("Chatbot Error:", err);
      setError("I'm having trouble connecting to the AI service. This could be due to a network issue or API limits.");
      setLastUserMessage(messageText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    await sendMessage(userMessage);
  };

  const handleRetry = async () => {
    if (!lastUserMessage || isLoading) return;
    await sendMessage(lastUserMessage);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Aegis AI Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-100' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-emerald-600" />
                    <span className="text-xs text-slate-400 font-medium">Assistant is thinking...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Connection Error</span>
                  </div>
                  <p className="text-xs text-red-700 text-center leading-relaxed">{error}</p>
                  <button 
                    onClick={handleRetry}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-xl text-xs font-bold border border-red-200 hover:bg-red-50 transition-colors shadow-sm"
                  >
                    <RefreshCw size={14} />
                    Retry Last Message
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about our services..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-slate-900' : 'bg-emerald-600'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white">
                <Shield size={18} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">AEGIS <span className="text-emerald-600">AI</span></span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Leading the global transition to AI-enhanced health and safety. We build tools that protect lives and optimize performance through intelligent engineering.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <span className="sr-only">{s}</span>
                  <Activity size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6">Solutions</h5>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Industrial Safety</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Healthcare Apps</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Consulting</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Lifecycle Services</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#research" className="hover:text-emerald-400 transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 Aegis AI & Safety Systems. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Industries Served', value: '12+' },
                { label: 'AI Models Deployed', value: '150+' },
                { label: 'Safety Incidents Reduced', value: '40%' },
                { label: 'Global Partners', value: '25+' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-4xl font-bold text-slate-900 mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SocialProof />

        <Suspense fallback={<SectionLoading />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <Lifecycle />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <PPESection />
        </Suspense>
        
        <Suspense fallback={<SectionLoading />}>
          <ResearchSection />
        </Suspense>

        <ContactSection />

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-emerald-600 to-indigo-700 rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" />
                <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white rounded-full" />
              </div>
              
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 relative z-10">
                Ready to transform your <br />safety infrastructure?
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
                Join the leading organizations using Aegis AI to build safer, more efficient workplaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl">
                  Schedule a Consultation
                </button>
                <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
