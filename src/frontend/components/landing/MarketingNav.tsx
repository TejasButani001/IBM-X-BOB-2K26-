'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Menu, X } from 'lucide-react';

export const MarketingNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#080C16]/90 backdrop-blur-md select-none transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
            FLUXCHAIN <span className="text-[10px] px-1 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
          <Link href="/platform" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Platform
          </Link>
          <Link href="/solutions" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Solutions
          </Link>
          <Link href="/features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/use-cases" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Use Cases
          </Link>
          <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Pricing
          </Link>
        </div>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/app/overview"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
          >
            <span>Launch Control Tower</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/app/overview"
            className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-xs font-semibold"
          >
            Launch
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B101D] px-4 py-4 space-y-2.5 text-xs shadow-xl">
          <Link
            href="/platform"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium"
          >
            Platform
          </Link>
          <Link
            href="/solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium"
          >
            Solutions
          </Link>
          <Link
            href="/features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium"
          >
            Features
          </Link>
          <Link
            href="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium"
          >
            How It Works
          </Link>
          <Link
            href="/use-cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium"
          >
            Use Cases
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium"
          >
            Pricing
          </Link>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/app/overview"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 rounded-md bg-indigo-600 text-white text-xs font-semibold"
            >
              Launch Control Tower
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

