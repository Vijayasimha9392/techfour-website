# TechFour Talent Studio Website

A modern, high-performance portfolio and talent studio website built for **TechFour** — a team of four technology professionals specializing in Full-Stack Web Development, Data Science & AI, DevOps Automation, and Enterprise .NET Solutions.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) (SSR / Full-Stack React)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State & Data**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI primitives)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) + [Nitro](https://nitro.unjs.io/)
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js (v18+ recommended) and `npm` installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vijayasimha9392/techfour-website.git
   cd techfour-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser to view the site.

---

## 📜 Available Scripts

- `npm run dev` — Starts the development server with HMR.
- `npm run build` — Builds the application for production.
- `npm run preview` — Previews the production build locally.
- `npm run test` — Runs tests with Vitest.
- `npm run test:watch` — Runs Vitest in watch mode.
- `npm run lint` — Lints code with ESLint.
- `npm run format` — Formats code using Prettier.

---

## 📁 Project Structure

```text
techfour-website/
├── public/              # Static assets (images, icons, etc.)
├── src/
│   ├── components/      # UI components (Hero, Team, Projects, Services, etc.)
│   │   └── ui/          # Reusable UI primitives (Shadcn UI components)
│   ├── data/            # Static data (team members, projects, services, tracks)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions & contact intent handlers
│   ├── routes/          # TanStack Router page routes
│   ├── styles.css       # Global styles and Tailwind configuration
│   ├── server.ts        # Server entry point (Nitro / SSR)
│   └── start.ts         # Application entry point
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

---

## 👥 The TechFour Team

TechFour brings together four specialized engineering disciplines:

1. **Full-Stack Development** — React, Node.js, Next.js, Cloud Solutions
2. **Data Science & AI** — Python, Machine Learning, Analytics, Intelligent Systems
3. **DevOps & Cloud** — CI/CD, Kubernetes, Docker, Cloud Infrastructure
4. **Enterprise .NET** — C#, .NET Core, Microservices, Enterprise Systems

---

## 📄 License

Private repository for TechFour. All rights reserved.