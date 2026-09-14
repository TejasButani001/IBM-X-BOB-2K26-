import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ControlTowerProvider } from '../context/ControlTowerContext';

export const metadata: Metadata = {
  title: 'FluxChain AI — AI-Powered Supply Chain Control Tower',
  description:
    'Turn disruption into a decision. Real-time disruption intelligence, multimodal route optimization, fleet idle capacity redeployment, and kinetic cold-chain monitoring.',
  keywords: [
    'Supply Chain Control Tower',
    'Disruption Management',
    'Fleet Optimization',
    'Cold Chain Monitoring',
    'IBM Bob AI',
    'watsonx',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white">
        <ControlTowerProvider>{children}</ControlTowerProvider>
      </body>
    </html>
  );
}
