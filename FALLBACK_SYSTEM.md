# API Fallback & Mock Data System

> **Robust financial data handling with automatic fallback to realistic simulated data**

## Overview

The FinGuard API now includes a sophisticated **fallback mechanism** that automatically switches to simulated financial data when the backend API is unavailable. This ensures:

- ✅ **Continuous Operation** - App never shows broken UI or blank states
- ✅ **Realistic Data** - Generated data follows actual financial patterns
- ✅ **Seamless Experience** - Users are notified of fallback mode with clear warning
- ✅ **Development Ready** - Perfect for demos, testing, and development environments

## Architecture

### Frontend Flow
```
User Request
    ↓
API Call (lib/api.ts)
    ↓
[Try Real API]
    ├─ Success? → Return Real Data + Clear Fallback Flag
    └─ Failure? → Log Error + Switch to Fallback
        ↓
    Import Mock Data Generator (lib/mockData.ts)
        ↓
    Generate Realistic Simulated Data
        ↓
    Return Data + Set Fallback Flag (isApiInFallback() = true)
        ↓
    FallbackBanner Component Displays Warning
```

## Components

### Frontend: `lib/mockData.ts`
**Generates realistic financial data across all domains:**

```typescript
// Financial State
generateMockFinancialState(): FinancialState
- Returns current cash balance, runway, burn rate, etc.
- Randomized within business parameters

// 30-Day Forecast
generateMockForecast(): Forecast
- Monte Carlo-style cash flow simulation
- Confidence intervals (P10, P50, P90)
- Daily balance projections

// Transactions
generateMockTransactions(count): Transaction[]
- 50 simulated transactions (default)
- Multiple vendors, sources, dates
- Realistic amounts and confidence scores

// Invoices
generateMockInvoices(count): Invoice[]
- 20 simulated invoices (default)
- Mix of paid/pending statuses
- Match confidence scoring

// Payment Decisions
generateMockDecisions(count): Decision[]
- 10 obligation rankings (default)
- TOPSIS scores, delay probabilities
- Model contribution explanations

// AI Action Drafts
generateMockActionDraft(vendor, amount, tone): ActionDraft
- Formal/friendly/strict tone options
- Vendor-specific communication
- Ready-to-send templates
```

### Frontend: `lib/api.ts` (Enhanced)
**New fallback-aware API wrapper:**

```typescript
// Check current state
isApiInFallback(): boolean        // Is API unavailable?
getLastApiError(): string | null  // What was the error?

// New fallback-enabled fetch
fetchJsonWithFallback<T>(
  path: string,
  fallbackFn: () => T,
  init?: RequestInit
): Promise<T>

// Updated endpoints (all now with fallback):
- getHealth()
- getFinancialState()
- getForecast()
- getTransactions()
- getReconcileSummary()
- getInvoices()
- getInvoiceSummary()
- getDecisionRanking()
- getScenarios()
- generateActionDraft()
- getLLMStatus()
```

### Frontend: `components/FallbackBanner.tsx`
**User-facing warning component:**

- Displays prominent yellow warning when API unavailable
- Shows error details in collapsible section
- Auto-hides when API recovers
- Non-intrusive but informative
- Includes recovery instructions

### Backend: `mock_data.py` (New)
**Python-level mock data generation:**

```python
generate_mock_financial_state()      # Financial metrics
generate_mock_forecast_data()        # 30-day forecast
generate_mock_transactions(count)    # Transaction history
generate_mock_invoices(count)        # Invoice data
generate_mock_decisions(count)       # Payment rankings
generate_mock_action_draft()         # AI communication drafts
```

## Usage

### For Users
**No action required!** The fallback system is automatic:

1. **Normal Operation:**
   - Backend running → Real data displayed
   - No warning shown

2. **Backend Down:**
   - API request fails
   - Automatically switches to simulated data
   - Yellow banner appears with warning
   - App continues functioning normally

3. **Recovery:**
   - Backend comes back online
   - Next API request succeeds
   - Banner disappears automatically
   - Real data resumes

### For Developers

#### Enable Fallback Mode (Testing)
```typescript
// Manually trigger fallback for specific endpoint
const data = await fetchJsonWithFallback(
  '/api/forecast/',
  () => generateMockForecastResponse(),
  // optional: init parameters
);
```

#### Check Fallback Status
```typescript
import { isApiInFallback, getLastApiError } from './lib/api';

if (isApiInFallback()) {
  console.log('Using fallback data');
  console.log('Error was:', getLastApiError());
}
```

#### Use Backend Mock Generation
```python
from mock_data import generate_mock_financial_state, generate_mock_forecast_data

# In development or tests
state = generate_mock_financial_state()
forecast = generate_mock_forecast_data()
```

## Data Realism

### Randomization Strategy
All generated data respects realistic business constraints:

**Financial State:**
- Cash balance: $2.5M ± $500K
- Monthly burn: $250K ± $100K
- Working capital: balance - payables
- Days to zero: 45-75 days

**Forecast:**
- Based on daily random inflows/outflows
- P10/P50/P90 bands represent confidence
- Volatility: 2-7% daily
- Realistic balance trajectory

**Transactions:**
- Vendors: 8 realistic company names
- Amounts: $10K - $510K per transaction
- Sources: UPI, Bank Transfer, Card, Cheque, Cash
- Confidence: 60-95% accuracy simulation
- Dates: Spread across 90-day history

**Invoices:**
- 20 invoices (50% paid, 50% pending)
- Issue-to-due: 30 days standard
- Match confidence: 65-95%
- Mix of vendors and amounts

**Decisions:**
- 10 obligations ranked by TOPSIS score
- Delay probability: 0-40% per vendor
- Relationship damage scoring
- Feature contributions with SHAP-like explanations

**Action Drafts:**
- Three tone options (formal/friendly/strict)
- Vendor and amount-specific messaging
- Professional communication templates

## Deployment

### Environment Variables
No additional configuration needed! The fallback system works out of the box.

**Optional:** Control fallback behavior via environment variable
```env
# Force using fallback data (useful for demos/training)
FORCE_MOCK_DATA=false    # Default: false (use real API)

# API timeout before switching to fallback
API_TIMEOUT_MS=5000      # Default: 5000ms
```

### Docker/Container
The mock data generation has minimal dependencies:
- Built-in Python libraries only (datetime, random, typing)
- Zero external packages required
- ~200 lines of pure Python

## Monitoring

### Console Warnings
When fallback activates, detailed logs appear:

```
⚠️ API Request Failed [/api/forecast/]: API 503: Service Unavailable
📊 Using simulated data for: /api/forecast/
```

### User-Facing Indicator
FallbackBanner shows:
- Clear warning about API connection issue
- Current error message (expandable)
- Recovery instructions
- Dismissable (but re-appears if error persists)

## Limitations & Warnings

⚠️ **Important:** While fallback data is realistic, it's **not real data**:
- Simulated at request time (not persistent)
- Does not reflect actual financial state
- Should not be used for real decision-making
- Regenerated on each request (new values each time)

✅ **Good for:**
- Development and testing
- Demos and presentations
- Learning the interface
- Testing UI with various data ranges
- Ensuring app never shows broken state

❌ **Not for:**
- Production financial decisions
- Reporting actual business metrics
- Auditing or compliance
- Historical data analysis
- Persistent data storage

## FAQ

### Q: Will users see the fallback banner in production?
**A:** Only if the backend genuinely goes down. In normal operation with backend running, zero UI changes.

### Q: Does fallback data persist across requests?
**A:** No. Each request generates fresh random data. This is intentional—prevents stale data assumptions.

### Q: Can I customize the fallback data?
**A:** Yes! Edit `lib/mockData.ts` (frontend) or `mock_data.py` (backend) to adjust ranges, vendors, and parameters.

### Q: Does fallback slow down the app?
**A:** No. It's faster than waiting for API timeout. Data generation is instant (<10ms).

### Q: Can I force fallback mode for testing?
**A:** Yes, set `FORCE_MOCK_DATA=true` environment variable, or manually call `fetchJsonWithFallback()`.

## Future Enhancements

- [ ] Persistent fallback cache (localStorage)
- [ ] Configurable mock data scenarios
- [ ] Historical fallback data replay
- [ ] A/B testing with fallback vs. real data
- [ ] Fallback data export for offline use

---

**Documentation Version:** 2.4.0  
**Last Updated:** 2026-03-26  
**Maintainer:** FinGuard Development Team
