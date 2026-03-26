# FinGuard - Financial Management Platform

A modern, full-stack financial management application built with React, TypeScript, and Python FastAPI. FinGuard provides comprehensive financial tracking, forecasting, and decision-making tools with an elegant, animated user interface.

## 🎨 Features

- **Dashboard** - Real-time financial overview and analytics
- **Transactions** - Track and manage all financial transactions
- **Invoices** - Create, manage, and monitor invoices
- **Payments** - Process and track payments
- **Forecast** - AI-powered financial forecasting and predictions
- **Decision Engine** - Intelligent financial decision support
- **Action Composer** - Create and manage financial actions
- **Professional Authentication** - Secure login/register with animated UI
- **Animated Backgrounds** - Sophisticated blob animations throughout the application
- **Responsive Design** - Mobile-first responsive interface
- **Lazy Loading** - Optimized page loading with lazy-loaded components

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Supabase** - Authentication and backend services
- **Material Symbols** - Icon library

### Backend
- **Python 3.x** - Server runtime
- **FastAPI** - High-performance API framework
- **SQLAlchemy** - ORM for database operations
- **Supabase** - Database and authentication provider

## 📁 Project Structure

```
finguard/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (Dashboard, Transactions, etc.)
│   │   ├── App.tsx          # Main application component
│   │   └── main.tsx         # Entry point
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.js   # TailwindCSS configuration
│   └── package.json         # Dependencies and scripts
│
├── backend/                  # Python FastAPI backend
│   ├── routers/             # API route handlers
│   │   ├── transactions.py
│   │   ├── invoices.py
│   │   ├── payments.py
│   │   ├── forecast.py
│   │   ├── decisions.py
│   │   └── actions.py
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database configuration
│   └── requirements.txt      # Python dependencies
│
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - For frontend
- **Python** (v3.8 or higher) - For backend
- **npm** or **yarn** - Node package manager
- **git** - Version control

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/finguard.git
cd finguard
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
```

Configure environment variables by creating a `.env.local` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

#### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Configure environment variables by creating a `.env` file:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
DATABASE_URL=your_database_url
```

## 📝 Running the Application

### Development Mode

**Terminal 1 - Backend (Python)**
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend (Node)**
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:8000`

### Production Build

**Frontend**
```bash
cd frontend
npm run build
npm run preview  # Preview production build locally
```

**Backend**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🎯 Key Features Details

### Authentication
- **Security**: Supabase authentication with JWT tokens
- **Animated UI**: Professional login/register pages with background animations
- **OAuth**: Google authentication integration
- **Session Management**: Persistent authentication with React Context

### Dashboard
- Real-time financial metrics
- Visual data insights
- Quick action buttons
- Transaction summaries

### Transactions
- Transaction history with filtering
- CSV import/export functionality
- Transaction categorization
- Date range filtering
- Lazy-loaded transaction lists for performance

### Forecasting
- AI-powered financial predictions
- Trend analysis
- Budget recommendations
- Interactive charts

### Responsive Design
- Mobile-first approach
- TailwindCSS grid system
- Adaptive typography
- Touch-friendly interfaces

### Performance Optimizations
- **Lazy Loading**: Components load on-demand
- **Code Splitting**: Vite automatic code splitting
- **Animations**: GPU-accelerated CSS animations
- **Optimization**: Minimal JavaScript overhead

## 🎨 Design System

### Color Scheme
- **Primary Blue**: #004ac6 - #0055e0 (gradient)
- **Background**: White to Blue-50
- **Accent Colors**: Emerald, Cyan, Indigo

### Typography
- **Headers**: Manrope (font-weight: 600-800)
- **Body**: Inter (font-weight: 400-600)
- **Monospace**: Roboto Mono

### Animation System
- **Float**: 6s vertical bobbing
- **RotateSlow**: 20s 360° rotation
- **PulseSlow**: 4s breathing effect
- **Shimmer**: 8s horizontal sweep
- **Staggered timing** for wave-like effects

## 🔧 Configuration

### TailwindCSS
Custom animations and styling in `tailwind.config.js`:
- Extended color palettes
- Custom animation keyframes
- Plugin configurations

### Vite
Build optimization in `vite.config.ts`:
- Fast refresh for development
- Optimized production builds
- CSS preprocessing

## 📊 API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/{id}` - Update invoice
- `DELETE /api/invoices/{id}` - Delete invoice

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Record payment
- `PUT /api/payments/{id}` - Update payment

### Forecast
- `GET /api/forecast` - Get financial forecasts
- `POST /api/forecast/generate` - Generate new forecast

### Decisions
- `GET /api/decisions` - Get decision recommendations
- `POST /api/decisions/evaluate` - Evaluate financial decisions

## 🐛 Troubleshooting

### Frontend Issues
- **Build errors**: Clear `node_modules` and `dist`, then run `npm install` and `npm run build`
- **Hot reload not working**: Restart dev server with `npm run dev`
- **TypeScript errors**: Run `npm run type-check` to validate types

### Backend Issues
- **Connection refused**: Ensure backend is running on port 8000
- **Database errors**: Check `.env` configuration and database connection
- **CORS issues**: Verify backend CORS configuration for frontend URL

### General Issues
- **Port conflicts**: Change port in `vite.config.ts` (frontend) or uvicorn command (backend)
- **Environment variables**: Ensure all required `.env` files are present and correctly configured
- **Module not found**: Run `npm install` in frontend or `pip install -r requirements.txt` in backend

## 📚 Development Guidelines

### Frontend
- Use functional components with hooks
- Maintain TypeScript strict mode
- Follow TailwindCSS conventions
- Keep components modular and reusable
- Use React Router for navigation
- Implement lazy loading with React.lazy()

### Backend
- Follow PEP 8 style guide
- Use type hints for all functions
- Implement proper error handling
- Use SQLAlchemy ORM patterns
- Write docstrings for functions
- Include input validation and sanitization

## 🔐 Security Considerations

- **Authentication**: All requests should include valid JWT tokens
- **CORS**: Frontend and backend configured with proper CORS policies
- **Environment Variables**: Sensitive keys stored in `.env` files (never committed)
- **Input Validation**: Server-side validation on all API endpoints
- **HTTPS**: Use HTTPS in production deployments

## 📄 License

[Add your license here - MIT, Apache 2.0, etc.]

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email support@finguard.com or open an issue on the repository.

## 🎉 Acknowledgments

- React and TypeScript communities
- TailwindCSS for excellent styling framework
- FastAPI for high-performance backend
- Supabase for authentication and database services
- All contributors and supporters

---

**FinGuard** - Empowering Financial Management 💰
