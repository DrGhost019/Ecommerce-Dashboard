# E-Commerce Dashboard

A modern, fully responsive admin dashboard for e-commerce analytics built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Recharts**. The dashboard displays key metrics such as sales target progress, revenue, customer growth, transaction stats, and popular products — all powered by a mock API with built‑in loading and error handling.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=E-commerce+Dashboard+Preview)

## ✨ Features

- 📊 **Real‑time Sales Charts** – Interactive line charts showing average sale value and average item per sale.
- 🎯 **Sales Target Tracker** – Editable progress bar with drag‑to‑adjust functionality.
- 👥 **Customer Growth Map** – Visual representation of growth by province.
- 📦 **Popular Products Table** – Expandable rows with product details and sortable columns.
- 🌓 **Dark Mode** – Seamless theme switching with next‑themes.
- 📱 **Fully Responsive** – Optimised for desktop, tablet, and mobile devices.
- ⚡ **Mock API** – Simulated backend with loading states and error fallbacks (no real server required).
- 🧩 **Reusable Components** – Modular design with TypeScript interfaces.

## 🛠️ Tech Stack

| Category       | Technologies |
|----------------|--------------|
| Framework      | Next.js 16 (App Router) |
| Language       | TypeScript 5 |
| Styling        | Tailwind CSS 3 + CSS Variables |
| Charts         | Recharts 3 |
| Icons          | Lucide React |
| Theme          | next‑themes |
| State & Effects| React Hooks (useState, useEffect) |
| HTTP Client    | Native fetch (with timeout & abort control) |

## 📁 Project Structure
ecommerce-dashboard/
├── app/ # Next.js App Router pages & API routes
│ ├── api/ # Mock API endpoints
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── dashboard/ # Dashboard specific components
│ └── layout/ # Header, Sidebar, ThemeProvider
├── lib/
│ ├── api.ts # API service with mock data fallback
│ └── utils.ts # Helper functions (cn, formatNumber, etc.)
├── public/ # Static assets (images, icons)
├── styles/ # Global CSS & Tailwind directives
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- **Node.js** 18.x or later (recommended: 20.x)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ecommerce-dashboard.git
   cd ecommerce-dashboard
   
2. **Install dependencies**
  npm install
  # or
  yarn install
  # or
  pnpm install

3. **Run the development server**
   npm run dev
  # or
  yarn dev
  The application will be available at http://localhost:3000.

4. **Build for production (optional)**
   npm run build
   npm start

## 📡 API & Data
The project uses a mock API located in /app/api/. All data (dashboard stats, sales chart, messages, notifications) is generated locally. No external database or real backend is required.

If you later decide to connect a real API, modify the lib/api.ts file – replace the mock functions with actual fetch calls.

## 🎨 Customisation
Colours & Theme: Edit app/globals.css (CSS variables for light/dark mode) or tailwind.config.js.

Mock Data: Update the mock objects inside lib/api.ts or the API route files (app/api/dashboard/route.ts, etc.).

Sidebar Menu: Add/remove items in components/layout/Sidebar.tsx.

## 📝 License
This project is licensed under the MIT License – see the LICENSE file for details.

## 🙌 Acknowledgements
- Next.js Documentation

- Tailwind CSS

- Recharts

- Lucide Icons

