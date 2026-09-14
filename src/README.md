# FluxChain AI — Source Code Architecture

All application source code is organized inside `src/`.

## Directory Layout

```
src/
├── frontend/
│   ├── app/                                 # Next.js App Router
│   │   ├── (marketing)/                     # Public SaaS website
│   │   │   ├── page.tsx                     # Landing page with interactive hero & preview
│   │   │   ├── features/                    # Technical capability breakdown
│   │   │   ├── solutions/                   # Industry solutions matrix
│   │   │   ├── how-it-works/                # 5-step operational workflow
│   │   │   ├── platform/                    # Control tower pillars
│   │   │   ├── use-cases/                   # Real-world scenarios & ROI
│   │   │   ├── pricing/                     # Predictable enterprise tiering
│   │   │   ├── about/                       # Mission & safety principles
│   │   │   ├── contact/                     # Enterprise pilot request
│   │   │   └── demo/                        # 20-step hackathon demo walkthrough
│   │   ├── login/                           # Enterprise SSO & credentials sign-in
│   │   ├── signup/                          # Organization registration
│   │   ├── forgot-password/                 # Credential recovery
│   │   ├── onboarding/                      # 4-step configuration wizard
│   │   └── app/                             # Authenticated Control Tower
│   │       ├── layout.tsx                   # Main app shell (Sidebar, Topbar, Demo bar)
│   │       ├── overview/                    # Executive operational dashboard (6 KPIs)
│   │       ├── disruptions/                 # Disruption Center & [id] detail
│   │       ├── shipments/                   # Shipment Registry & [id] detail
│   │       ├── routing/                     # AI Multimodal Routing & [id] detail
│   │       ├── fleet/                       # Fleet utilisation, assets, & redeployment
│   │       ├── cold-chain/                  # Kinetic sensor tracking & [id] detail
│   │       ├── alerts/                      # Prioritized multi-channel alert desk
│   │       ├── copilot/                     # Grounded IBM Bob AI Operations Copilot
│   │       ├── action-center/               # 1-click execution & approval board
│   │       ├── analytics/                   # Performance & delay distributions
│   │       ├── simulations/                 # What-if 24h/48h/72h sandbox
│   │       ├── reports/                     # Audit-ready executive report generator
│   │       ├── integrations/                # IBM watsonx, Instana, AIS, & IoT feeds
│   │       └── settings/                    # Rule thresholds & AI confidence gates
│   │
│   ├── components/                          # Reusable UI & layout design system
│   │   ├── ui/                              # Badges, metric cards, command palette
│   │   ├── layout/                          # AppShell, Sidebar, Topbar
│   │   └── landing/                         # MarketingNav, MarketingFooter
│   │
│   ├── context/
│   │   └── ControlTowerContext.tsx          # Global reactive state & demo cascade engine
│   │
│   ├── data/
│   │   └── mockData.ts                      # Relational datasets (50+ shipments, fleet, D001)
│   │
│   ├── services/
│   │   └── ai/
│   │       └── bobClient.ts                 # IBM Bob AI / watsonx Granite 3.0 abstraction
│   │
│   └── types/
│       └── index.ts                         # Domain TypeScript interfaces
│
├── .env.example                             # Environment variable template
└── README.md                                # Source code layout documentation
```

## Running the Application Locally

```bash
# Navigate to frontend directory
cd src/frontend

# Install dependencies (already installed)
npm install

# Start local development server
npm run dev

# Or build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
