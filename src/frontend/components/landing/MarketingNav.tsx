'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, ArrowRight, Menu, X, Sparkles, Activity, ShieldCheck, ChevronRight } from 'lucide-react';

export const MarketingNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '/platform' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Features', href: '/features' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Use Cases', href: '/use-cases' },
    { label: 'Pricing', href: '/pricing' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Status Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-indigo-900/40 py-1.5 px-4 text-[11px] font-mono text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-400">IBM BOB AI v2.6 LIVE</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">
              Autonomous Bypass Active: JNPT Strike → Mundra Quay 3
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-indigo-400" />
              <span>50 Telemetry Signals</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <Link href="/demo" className="hidden sm:flex items-center gap-1 text-indigo-300 hover:text-white font-semibold transition-colors">
              Live Interactive Demo <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Header */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#080C16]/90 backdrop-blur-xl border-b border-indigo-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-[#080C16]/75 backdrop-blur-lg border-b border-slate-800/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-70 blur-xs group-hover:opacity-100 transition duration-300" />
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 border border-indigo-400/40 flex items-center justify-center text-white shadow-lg">
                <Layers className="w-4.5 h-4.5 text-cyan-300 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  FLUXCHAIN
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-mono text-[9px] font-bold tracking-widest flex items-center gap-1 shadow-inner">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
                  IBM BOB AI
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                Autonomous Supply Chain Control Tower
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 rounded-full p-1 bg-slate-900/60 border border-slate-800/90 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/80 transition-all duration-200"
            >
              Sign In
            </Link>

            <Link
              href="/app/overview"
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-indigo-300/30"
            >
              <span>Launch Control Tower</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/app/overview"
              className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md"
            >
              Launch
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-indigo-500/20 bg-[#080C16]/95 backdrop-blur-2xl px-5 py-5 space-y-3 shadow-2xl text-xs">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg font-semibold transition-colors ${
                    pathname === link.href
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/app/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <span>Launch Control Tower</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
