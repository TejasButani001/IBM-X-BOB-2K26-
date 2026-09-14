'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DemoModeBar } from '../ui/DemoModeBar';
import { CommandPalette } from '../ui/CommandPalette';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-[#080C16] dark:text-slate-100 overflow-hidden font-sans transition-colors duration-150">
      {/* Interactive Scenario Demo Ribbon */}
      <DemoModeBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Main Application Sidebar (Desktop & Mobile) */}
        <Sidebar />

        {/* Content Viewport with Header */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 lg:p-6 bg-slate-100/60 dark:bg-black/25">
            <div className="max-w-7xl mx-auto space-y-5">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Global Command Search Modal */}
      <CommandPalette />
    </div>
  );
};

