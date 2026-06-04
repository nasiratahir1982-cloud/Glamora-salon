# GLAMORA 💎
### "Stylish & Memorable"

**GLAMORA** is an enterprise-grade, luxury salon management ecosystem designed for high-end unisex studios and bridal suites. Built with Next.js, Tailwind CSS, and Framer Motion, it offers a premium experience for both clients and administrators.

---

## 🌟 Key Features

### 🏰 Specialized Wings
- **Royal Bridal Suite**: A dedicated ecosystem for bridal makeup, hair styling, mehndi, and spa treatments.
- **Gentlemen’s Lounge**: Sophisticated grooming, master cuts, and skin treatments for the modern man.

### 📅 Advanced Booking Engine
- Real-time slot availability.
- Multi-step intuitive booking process.
- WhatsApp & Email notification integration.
- Staff-specific scheduling.

### 📊 Enterprise Admin Console
- **Analytics Dashboard**: Live revenue tracking, department split, and performance heatmaps.
- **Staff Management**: Performance tracking, ratings, and commission management.
- **Inventory System**: SKU tracking, low-stock alerts, and vendor management.
- **Financial Reporting**: Weekly/Monthly profit & loss insights.

---

## 🚀 Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion (Animations)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database**: PostgreSQL (Supabase/Neon Compatible)
- **Deployment**: Vercel, Netlify, Docker, or Static Export (WordPress Subdomain)

---

## 🛠️ Getting Started

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local` and fill in your credentials.
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
# For standard Vercel/Node deployment
npm run build

# For Static Export (WordPress Subdomain / FTP)
$env:STATIC_EXPORT="true"
npm run build
```

---

## 📂 Project Structure
- `/src/app`: Next.js App Router (Pages & API)
- `/src/components`: UI Components & Layouts
- `/src/lib`: Database utilities and helper functions
- `/src/types`: TypeScript definitions
- `/src/context`: React Context for state management

---

## 📄 Documentation
- [Deployment Guide](./DEPLOYMENT.md)
- [Database Setup](./DATABASE_SETUP.md)
- [Environment Variables](./.env.example)

---

## ⚖️ License
Enterprise License - GLAMORA Salon Ecosystem.
Developed by **Antigravity**.
