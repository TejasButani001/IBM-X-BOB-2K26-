# Setup Guide — FluxChain AI Control Tower

> **This file provides exact, reproducible steps for hackathon judges and evaluators to run the application.**

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ (tested on Node.js v24.18.0)
- npm 9+ (tested on npm 11.10.1)
- Modern web browser (Chrome, Edge, Firefox, Safari)

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/TejasButani001/IBM-X-BOB-2K26-.git
cd IBM-X-BOB-2K26-

# 2. Navigate to the frontend directory
cd src/frontend

# 3. Install dependencies
npm install
```

## Running the Application Locally

```bash
# Inside src/frontend, start the development server
npm run dev
```

Open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

## Production Build Verification

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

## Key Evaluation Routes

| Route | Purpose | Key Highlights |
|---|---|---|
| `/` | Public SaaS Landing Page | Product overview, live interactive preview, ROI |
| `/demo` | Guided Demo Walkthrough | 20-step hackathon demo flow |
| `/login` | Enterprise Sign In | Instant demo 1-click bypass button |
| `/app/overview` | Main Control Tower | 6 KPI cards, active disruptions, critical shipments |
| `/app/disruptions/D001` | Mumbai Port Strike Detail | 18 affected shipments, 5-step AI response plan |
| `/app/shipments/S101` | High-Risk Shipment Detail | Checkpoint timeline, cold-chain correlation |
| `/app/routing` | AI Multimodal Routing | Mundra Port bypass vs Hazira and Pipavav |
| `/app/fleet/redeployment` | AI Redeployment Matcher | Truck T04 in Ahmedabad 94% corridor match |
| `/app/cold-chain/VAX-2045` | Kinetic Telemetry Detail | Time-series chart, Arrhenius degradation window |
| `/app/copilot` | IBM Bob AI Operations Copilot | Grounded operational chat with structured triage |
| `/app/action-center` | Centralized Action Board | 1-click "Approve All Immediate Actions" |
| `/app/simulations` | What-If Sandbox | 24h / 48h / 72h duration slider |

## Troubleshooting

| Issue | Resolution |
|---|---|
| Port 3000 in use | Run `npm run dev -- -p 3001` to start on port 3001 |
| Missing node_modules | Ensure you ran `npm install` inside `src/frontend/` |
