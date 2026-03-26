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
```

## 🚀 Getting Started

### Prerequisites
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
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

**Frontend will be available at:** `http://localhost:5173`

#### 3. Backend Setup
```bash
cd backend
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
