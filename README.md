# 🚀 GigFlow – Smart Leads Dashboard

A production-grade full-stack MERN application for managing and tracking sales leads. Built with modern technologies and best practices.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## ✨ Features

### Authentication
- 🔐 JWT-based authentication
- 👤 User registration & login
- 🛡️ Role-based access control (Admin / Sales)
- 🔒 Protected routes with middleware

### Lead Management
- ➕ Create, read, update, and delete leads
- 🏷️ Status tracking: New → Contacted → Qualified → Lost
- 🌐 Source tracking: Website, Instagram, Referral
- 🔍 Debounced search (500ms) by name/email
- 🎛️ Advanced filtering by status, source, and sort order
- 📄 Server-side pagination (10 per page)
- 📊 CSV export for filtered leads

### Dashboard
- 📈 Statistics cards (total, new, qualified, lost)
- 📊 Lead distribution visualization
- 🕐 Recent activity feed

### UI/UX
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Skeleton loading states
- 📭 Empty state components
- 🔔 Toast notifications
- ✅ Form validation with Zod
- 🎨 Modern SaaS design (Linear/Notion inspired)

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| TypeScript | Type Safety |
| TailwindCSS | Styling |
| React Query | Server State |
| Zustand | Client State |
| React Router | Routing |
| React Hook Form + Zod | Forms & Validation |
| Axios | HTTP Client |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express | HTTP Framework |
| TypeScript | Type Safety |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Zod | Request Validation |
| Helmet | Security Headers |

## 📁 Project Structure

```
gigflow-smart-leads-dashboard/
├── frontend/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/                 # API layer (Axios)
│   │   ├── components/
│   │   │   ├── auth/            # Auth components
│   │   │   ├── dashboard/       # Dashboard widgets
│   │   │   ├── layout/          # Sidebar, Navbar, Layout
│   │   │   ├── leads/           # Lead-specific components
│   │   │   └── ui/              # Reusable UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Validation schemas
│   │   ├── pages/               # Page components
│   │   ├── store/               # Zustand stores
│   │   ├── types/               # TypeScript interfaces
│   │   └── utils/               # Utility functions
│   ├── Dockerfile
│   └── package.json
├── backend/                     # Backend (Express)
│   ├── src/
│   │   ├── config/              # DB & env config
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/           # Auth, error, validation
│   │   ├── models/              # Mongoose models
│   │   ├── repositories/        # Data access layer
│   │   ├── routes/              # Express routes
│   │   ├── seeds/               # Seed data
│   │   ├── services/            # Business logic
│   │   ├── types/               # TypeScript interfaces
│   │   ├── utils/               # Helpers & errors
│   │   └── validators/          # Zod schemas
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── API.md
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/PalakGautam-hub/gigflow-smart-leads-dashboard.git
cd gigflow-smart-leads-dashboard
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env    # Edit .env with your MongoDB URI
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 4. Seed Database
```bash
cd backend
npm run seed
```

### 5. Demo Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gigflow.com | admin123 |
| Sales | sales@gigflow.com | sales123 |

## 🐳 Docker Setup

```bash
docker-compose up --build
```

This starts:
- **MongoDB** on port 27017
- **Backend API** on port 5000
- **Frontend** on port 80

## 🌐 Deployment

### Frontend → Vercel
1. Connect your GitHub repository
2. Set root directory to `frontend`
3. Framework: Vite
4. Add environment variable: `VITE_API_URL=https://your-api.onrender.com/api`

### Backend → Render
1. Create a new Web Service
2. Set root directory to `backend`
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables from `.env.example`

### Database → MongoDB Atlas
1. Create a free cluster at [mongodb.com](https://www.mongodb.com/atlas)
2. Get your connection string
3. Set `MONGODB_URI` in backend environment

## 📖 API Documentation

See [API.md](./API.md) for complete API documentation.

## 🔑 Role Permissions

| Action | Admin | Sales |
|--------|-------|-------|
| View leads | ✅ | ✅ |
| View single lead | ✅ | ✅ |
| Create lead | ✅ | ❌ |
| Update lead | ✅ | ✅ |
| Delete lead | ✅ | ❌ |
| View dashboard | ✅ | ✅ |

## 📝 License

MIT License – feel free to use this project for learning and production.
