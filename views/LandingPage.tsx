import React, { useState, useEffect, useRef } from 'react';
import { login, signup, User } from '../services/authService';
import { Activity, ShieldCheck, Heart, Zap, ArrowRight, Github, Star, Linkedin, Instagram } from 'lucide-react';
import { Button } from '../components/Button';

interface LandingPageProps {
  onLoginSuccess: (user: User) => void;
}

// Helper component for Scroll Reveal Animations
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user: User;
      if (authMode === 'LOGIN') {
        user = await login(email, password);
      } else {
        user = await signup(email, password, name);
      }
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const reviews = [
    { name: 'Alex M.', role: 'Fitness Enthusiast', text: 'This app completely changed how I track my hydration. The AI insights are scary accurate!' },
    { name: 'Sarah J.', role: 'Yoga Instructor', text: 'Beautiful design and so easy to use. I love the daily goals feature.' },
    { name: 'David K.', role: 'Developer', text: 'Finally a health app that isn\'t cluttered. Dark mode is perfect.' },
    { name: 'Emily R.', role: 'Student', text: 'Helps me sleep better by tracking my habits. Highly recommend!' },
    { name: 'Michael T.', role: 'Runner', text: 'Simple, fast, and looks amazing. The steps integration is seamless.' },
  ];

  // Auto-slide reviews every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden flex flex-col">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-header border-b border-slate-800/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">Medi<span className="text-blue-500">Org</span></span>
          </div>
          <button 
            onClick={() => {
              document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 rounded-full bg-slate-800 text-sm font-bold text-white hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-500 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 flex items-center justify-center min-h-[90vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-4xl mx-auto text-center z-10">
          <ScrollReveal>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 hover:bg-blue-900/50 transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              v2.0 Now Available
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight mb-8 leading-tight drop-shadow-xl">
              Your Health, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Intelligently Organized.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Track water, steps, and sleep with <span className="text-slate-200 font-semibold">AI-powered insights</span>. 
              Experience a health tracker designed for modern life.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
               <Button 
                  onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-16 px-10 text-lg w-full sm:w-auto shadow-blue-500/40 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50"
               >
                  Explore Features
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Button>
               <button 
                  onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-4 rounded-xl font-semibold text-slate-400 hover:text-white border border-transparent hover:border-slate-700 hover:bg-slate-900 transition-all"
               >
                  Sign In / Sign Up
               </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Grid (Reordered: Features First) */}
      <section id="features-section" className="py-32 px-6 max-w-7xl mx-auto w-full bg-slate-950 relative">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Advanced Capabilities</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Everything you need to maintain a healthy lifestyle, packaged in a beautiful interface.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             { icon: Zap, title: "Instant Logging", desc: "Log water, steps, and sleep in seconds with our optimized quick-add interface.", color: "text-amber-400" },
             { icon: ShieldCheck, title: "Privacy First", desc: "Your health data stays on your device. We prioritize your data security above all else.", color: "text-emerald-400" },
             { icon: Heart, title: "AI Insights", desc: "Get personalized health tips generated daily based on your activity patterns and goals.", color: "text-rose-400" }
           ].map((feature, idx) => (
             <ScrollReveal key={idx} delay={idx * 150}>
               <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10 h-full relative overflow-hidden">
                  <div className={`w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 ${feature.color} shadow-lg`}>
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
                  
                  {/* Hover Gradient Blob */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors duration-500 pointer-events-none"></div>
               </div>
             </ScrollReveal>
           ))}
        </div>
      </section>

      {/* Reviews Section (Auto-Scrolling Carousel) */}
      <section className="py-32 bg-slate-900/30 border-y border-slate-800/50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Trusted by Thousands</h2>
              <div className="flex justify-center space-x-1">
                 {[1,2,3,4,5].map(i => <Star key={i} className="text-yellow-500 fill-yellow-500" size={20} />)}
              </div>
            </div>
          </ScrollReveal>

          {/* Carousel Container */}
          <ScrollReveal delay={200}>
            <div className="relative max-w-4xl mx-auto">
              {/* Slides */}
              <div className="overflow-hidden relative h-[250px] md:h-[200px]">
                {reviews.map((review, idx) => {
                  // Logic to show active slide
                  const offset = idx - activeReviewIndex;
                  const isActive = idx === activeReviewIndex;
                  
                  let transformClass = 'translate-x-full opacity-0 scale-90';
                  if (isActive) transformClass = 'translate-x-0 opacity-100 scale-100 z-10';
                  else if (offset === -1 || (activeReviewIndex === 0 && idx === reviews.length - 1)) transformClass = '-translate-x-full opacity-0 scale-90'; // prev
                  
                  return (
                    <div 
                      key={idx} 
                      className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-center px-4 ${transformClass}`}
                    >
                      <p className="text-2xl md:text-3xl text-slate-300 font-medium italic mb-8 leading-relaxed">"{review.text}"</p>
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                          {review.name.charAt(0)}
                        </div>
                        <div className="ml-4 text-left">
                          <p className="text-lg font-bold text-white">{review.name}</p>
                          <p className="text-sm text-blue-400 uppercase font-bold tracking-wider">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeReviewIndex ? 'bg-blue-500 w-8' : 'bg-slate-700 hover:bg-slate-600'}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-md mx-auto">
          <ScrollReveal>
            <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-blue-500/20 transition-colors">
               {/* Decorative blob */}
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-blue-600/20 transition-colors duration-700"></div>

               <div className="relative z-10 text-center mb-8">
                 <h2 className="text-4xl font-bold text-white mb-3 animate-fade-in-up" key={authMode + "title"}>
                   {authMode === 'LOGIN' ? 'Welcome Back' : 'Join MediOrg'}
                 </h2>
                 <p className="text-slate-400">
                   {authMode === 'LOGIN' ? 'Enter your details to access your dashboard.' : 'Start your health journey today.'}
                 </p>
               </div>

               <form onSubmit={handleAuth} className="space-y-5 relative z-10">
                 {authMode === 'SIGNUP' && (
                   <div className="group">
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1 group-focus-within:text-blue-500 transition-colors">Name</label>
                     <input 
                        type="text" 
                        required 
                        className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700"
                        placeholder="Your Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                     />
                   </div>
                 )}
                 
                 <div className="group">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1 group-focus-within:text-blue-500 transition-colors">Email</label>
                   <input 
                      type="email" 
                      required 
                      className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700"
                      placeholder="hello@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                   />
                 </div>

                 <div className="group">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1 group-focus-within:text-blue-500 transition-colors">Password</label>
                   <input 
                      type="password" 
                      required 
                      className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                   />
                 </div>

                 {error && (
                   <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-medium animate-pulse">
                     {error}
                   </div>
                 )}

                 <Button 
                   type="submit" 
                   fullWidth 
                   className="h-14 mt-4 shadow-xl shadow-blue-900/30 text-lg"
                   disabled={loading}
                 >
                   {loading ? 'Processing...' : (authMode === 'LOGIN' ? 'Sign In' : 'Create Account')}
                 </Button>
               </form>

               <div className="mt-8 text-center relative z-10">
                 <button 
                   onClick={() => setAuthMode(authMode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                   className="text-sm text-slate-400 hover:text-white transition-colors font-medium border-b border-transparent hover:border-white pb-0.5"
                 >
                   {authMode === 'LOGIN' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                 </button>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 px-6 border-t border-slate-900 mt-auto">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center space-x-2 mb-2">
               <Activity className="text-blue-600 w-6 h-6" />
               <span className="text-xl font-bold text-slate-200">MediOrg</span>
             </div>
             <p className="text-slate-500 text-sm">Empowering your health journey.</p>
           </div>
           
           <div className="flex gap-8">
             <a href="https://github.com/Sarthakkadu18" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-400 hover:scale-110 transition-all bg-slate-900 p-3 rounded-full" aria-label="Github"><Github size={20} /></a>
             <a href="https://www.linkedin.com/in/sarthak-kadu-55046632a/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-400 hover:scale-110 transition-all bg-slate-900 p-3 rounded-full" aria-label="LinkedIn"><Linkedin size={20} /></a>
             <a href="https://www.instagram.com/sarthak.kaduu/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-400 hover:scale-110 transition-all bg-slate-900 p-3 rounded-full" aria-label="Instagram"><Instagram size={20} /></a>
           </div>

           <div className="text-sm text-slate-600 font-medium">
             © 2024 MediOrg Inc.
           </div>
         </div>
      </footer>
    </div>
  );
};