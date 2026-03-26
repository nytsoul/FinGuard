<<<<<<< HEAD
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
=======
# FinGuard - Financial Intelligence Platform

> **Smart Cash Flow Management with AI-Powered Forecasting and Payment Intelligence**

FinGuard is a comprehensive financial management platform that helps businesses master their cash flow with intelligent forecasting, smart payment decisions, and real-time liquidity insights.

## 🎯 Features

### Core Capabilities
- **🔮 Smart Forecasting** - AI-driven cash flow projections accurate up to 90 days with Monte Carlo confidence intervals
- **⚡ Real-Time Insights** - Live liquidity analysis and instant alerts on critical financial events
- **🤖 AI Recommendations** - Smart payment strategies and vendor optimization based on your data
- **📊 Transaction Management** - Multi-source ingestion with automatic deduplication and reconciliation
- **📄 Invoice Matching** - Intelligent invoice-to-payment matching with OCR support
- **🎯 Payment Ranking** - TOPSIS-based obligation prioritization with delay probability prediction
- **💬 Action Composer** - LLM-powered payment communication drafting
- **🔒 Bank-Grade Security** - Enterprise-grade encryption with ISO 27001 compliance

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 19 with TypeScript
- Vite (dev server & build tool)
- Tailwind CSS with neumorphic design
- React Router for navigation
- Recharts for data visualization
- Supabase for authentication

**Backend:**
- FastAPI (Python web framework)
- Supabase (Database & Auth)
- XGBoost (Payment delay prediction)
- SHAP (Feature importance)
- Monte Carlo simulation (Cash flow forecasting)
- Pandas & NumPy (Data processing)
- LLM integration (Action drafting)

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: Supabase PostgreSQL

## 📋 Project Structure

```
FinGuard-main/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Auth context
│   │   ├── lib/             # API & utility functions
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/                  # FastAPI application
│   ├── main.py              # Main app entry point
│   ├── database.py          # Supabase client
│   ├── finance_engine.py    # Core financial logic
│   ├── llm_service.py       # LLM integration
│   ├── routers/             # API endpoints
│   ├── requirements.txt
│   ├── seed.py              # Data initialization
│   └── data/                # Sample datasets
├── vercel.json              # Vercel deployment config
├── render.yaml              # Render deployment config
├── DEPLOYMENT.md            # Deployment guide
└── README.md                # This file
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
```

## 🚀 Getting Started

### Prerequisites
<<<<<<< HEAD
- **Node.js** (v16 or higher) - For frontend
- **Python** (v3.8 or higher) - For backend
- **npm** or **yarn** - Node package manager
- **git** - Version control

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/finguard.git
cd finguard
=======
- Node.js 18+ (frontend)
- Python 3.10+ (backend)
- Git
- Supabase account
- Render/Vercel accounts (for deployment)

### Local Development Setup

#### 1. Clone Repository
```bash
git clone https://github.com/nytsoul/FinGuard.git
cd FinGuard-main
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
<<<<<<< HEAD
```

Configure environment variables by creating a `.env.local` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```
=======
npm run dev
```

**Frontend will be available at:** `http://localhost:5173`
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23

#### 3. Backend Setup
```bash
cd backend
<<<<<<< HEAD
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
=======
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

**Backend API will be available at:** `http://localhost:8001`

#### 4. Environment Configuration

**Frontend (.env):**
```env
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_API_BASE_URL=http://localhost:8001
```

**Backend (.env):**
```env
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
OPENAI_API_KEY=your_openai_key_here
```

## 🔌 API Endpoints

### Health Check
```bash
GET /api/health
```

### Financial State
```bash
GET /api/forecast/state
```
Returns current cash balance, burn rate, runway, etc.

### Forecasting
```bash
GET /api/forecast/
```
Returns 30-day cash flow forecast with Monte Carlo confidence intervals.

### Transactions
```bash
GET /api/transactions/
GET /api/transactions/reconcile/summary
```

### Invoices
```bash
GET /api/invoices/
GET /api/invoices/match/summary
```

### Decisions
```bash
GET /api/decisions/ranking
GET /api/decisions/scenarios
```

### Actions
```bash
POST /api/actions/draft
```
Parameters:
- `vendor_name`: string
- `amount`: number
- `context`: string
- `tone`: "formal" | "friendly" | "strict"

## 📱 Pages & Features

### Landing Page
- Marketing homepage with feature showcase
- Call-to-action for signup/login
- Customer benefits highlights

### Authentication
- **Login** - Email/password + Google OAuth
- **Register** - New account creation
- **Profile** - User profile management

### Dashboard
- Key financial metrics in cards
- Cash flow chart visualization
- Risk assessment panel
- Quick action buttons

### Forecast
- 90-day Monte Carlo cash flow projection
- Confidence intervals (P10, P50, P90)
- 7-day run rate table
- Financial health summary
- Key financial ratios

### Transactions
- Multi-source transaction ingestion
- Automatic deduplication
- Search and filter
- Desktop table view (responsive)
- **Mobile: Card view layout** for better usability

### Invoices
- Invoice matching with payments
- Match confidence scoring
- Paid/unpaid status tracking
- Vendor analytics

### Decision Engine
- Payment obligation ranking (TOPSIS)
- Delay probability prediction
- Scenario analysis (payment strategies)
- Relationship damage scoring

### Action Composer
- AI-powered payment drafts
- Customizable tone and content
- Vendor communication templates

### Settings
- User preferences
- Account management
- Security settings

## 🛠️ Building & Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

Output: `frontend/dist/`

### Build Backend
```bash
cd backend
pip install -r requirements.txt
# Backend is deployed as-is (no build step needed)
```

### Deploy to Vercel (Frontend)
1. Connect GitHub repository to Vercel
2. Configure Environment Variables (see DEPLOYMENT.md)
3. Set Root Directory to `frontend`
4. Vercel will automatically build and deploy

### Deploy to Render (Backend)
1. Create new Web Service on Render.com
2. Connect GitHub repository
3. Configure with `render.yaml`
4. Add Environment Variables (see DEPLOYMENT.md)
5. Render will automatically build and deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📊 Data Flow

```
User Actions
    ↓
Frontend (React UI)
    ↓
API Requests (axios via lib/api.ts)
    ↓
Backend (FastAPI)
    ↓
Data Processing (Pandas, NumPy, XGBoost)
    ↓
Supabase (Database & Auth)
    ↓
Response → Frontend → UI Update
```

## 🔐 Security Features

- **Supabase Auth** - Secure user authentication with JWT tokens
- **HTTPS** - All communication encrypted
- **CORS** - Configured to allow frontend domain only
- **Environment Variables** - Sensitive data never in code
- **Role-Based Access** - Protected endpoints via auth middleware
- **Rate Limiting** - API request throttling (configurable)

## 📈 Financial Algorithms

### Monte Carlo Forecasting
- Simulates 10,000 cash flow paths
- Accounts for transaction volatility
- Provides P10, P50, P90 confidence intervals
- 30-day horizon

### Payment Delay Prediction
- XGBoost model trained on historical data
- Features: vendor history, amount, timing, seasonal patterns
- SHAP explainability scores

### Obligation Ranking (TOPSIS)
- Multi-criteria decision analysis
- Weighs multiple factors:
  - Payment urgency (due date)
  - Vendor relationship (tenure)
  - Financial impact (amount, delay penalties)
  - Strategic importance
- Generates prioritized payment schedule

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run lint
```

### Backend Testing
```bash
cd backend
pytest tests/
```

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [CHECKLIST.md](CHECKLIST.md) - Pre-deployment checklist
- API Documentation - Available at `http://localhost:8001/docs` (Swagger UI)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 License

This project is proprietary. All rights reserved.

## 🙋 Support

For issues or questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for common issues
2. Check [CHECKLIST.md](CHECKLIST.md) for setup verification
3. Review API docs at `/docs` endpoint
4. Contact the development team

## 🎉 Key Improvements Made

- ✅ **Authentication** - Supabase integration with Google OAuth
- ✅ **Mobile Responsive** - Full mobile UI adaptation for all pages
- ✅ **Logout Fix** - Guaranteed logout with fallback redirect
- ✅ **Data Integrity** - Fixed Forecast data sampling
- ✅ **Performance** - Hot module reloading in development
- ✅ **Deployment** - Pre-configured Vercel & Render files

## 📅 Version History

- **v2.4.0** (Current) - Mobile responsiveness improvements, logout fixes, authentication enhancements
- **v2.0.0** - Complete platform rewrite with FastAPI backend
- **v1.0.0** - Initial release

---

**Built with ❤️ for financial intelligence**

Homepage: [FinGuard](https://finguard.vercel.app)
GitHub: [nytsoul/FinGuard](https://github.com/nytsoul/FinGuard)
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
