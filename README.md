# Observify - Complete Observability Platform

A modern, full-stack application monitoring platform built with React, TypeScript, and Cloudflare Workers. Monitor your websites and applications with real-time metrics, alerts, and beautiful dashboards.

## 🌟 Features

- **Website Monitoring**
  - Real-time uptime monitoring
  - Response time tracking
  - Error rate monitoring
  - SSL certificate validation
  - Global performance checks

- **Application Performance**
  - Distributed tracing
  - Service dependencies
  - Response time analysis
  - Error tracking
  - Custom metrics

- **Real-User Monitoring**
  - Page load performance
  - User journey analysis
  - Core Web Vitals tracking
  - Resource loading waterfall charts

- **Alerts & Notifications**
  - AI-powered anomaly detection
  - Custom alert thresholds
  - Multiple notification channels
  - Alert history and analysis

## 🚀 Tech Stack

### Frontend
- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn UI components
- React Router for navigation
- Recharts for data visualization

### Backend
- Cloudflare Workers
- Hono.js for API routing
- Prisma for database ORM
- PostgreSQL (via Prisma Accelerate)
- JWT for authentication

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Cloudflare account
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/observify.git
cd observify
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:

Frontend (.env):
```env
VITE_API_URL=http://localhost:8787/api
```

Backend (.env):
```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key"
```

4. Start development servers:

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## 🚀 Deployment

### Frontend (Cloudflare Pages)
```bash
cd frontend
npm run build
wrangler pages deploy dist
```

### Backend (Cloudflare Workers)
```bash
cd backend
wrangler deploy
```

## 📚 Documentation

Visit our [documentation](https://observify.pages.dev/docs) for detailed guides on:
- Installation and setup
- API reference
- Monitoring configuration
- Alert setup
- Best practices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful components
- [Cloudflare](https://cloudflare.com) for the hosting infrastructure
- [Prisma](https://prisma.io) for the database toolkit
- [Recharts](https://recharts.org/) for the charts library

## 📞 Support

For support, email support@observify.com or join our [Discord community](https://discord.gg/observify).
