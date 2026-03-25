import { NavLink, Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { name: 'Decisions', path: '/decision-engine', icon: 'insights' },
  { name: 'Forecast', path: '/forecast', icon: 'query_stats' },
  { name: 'Transactions', path: '/transactions', icon: 'receipt_long' },
  { name: 'Invoices', path: '/invoices', icon: 'description' },
  { name: 'Actions', path: '/actions', icon: 'bolt' },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen overflow-hidden bg-surface font-body text-on-surface antialiased">
      {/* Side Navigation */}
      <aside className="h-screen w-64 bg-[#f2f4f7] flex flex-col p-4 gap-2 font-manrope tracking-tight shadow-[4px_0_12px_rgba(180,190,210,0.3)] z-20">
        <div className="flex items-center gap-3 px-2 py-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#004ac6]">CashMind</h1>
            <p className="text-[10px] uppercase tracking-[0.1em] text-slate-500 font-bold">Financial Architect</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-white text-[#004ac6] shadow-[-4px_-4px_12px_rgba(255,255,255,0.8),4px_4px_12px_rgba(180,190,210,0.3)] font-semibold scale-[0.98]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-[#e6e8eb]'
                )
              }
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-2 border-t border-slate-200/50">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-white text-[#004ac6] shadow-[-4px_-4px_12px_rgba(255,255,255,0.8),4px_4px_12px_rgba(180,190,210,0.3)] font-semibold scale-[0.98]'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-[#e6e8eb]'
              )
            }
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative bg-surface">
        {/* Top Navigation */}
        <header className="flex justify-between items-center px-8 w-full h-16 bg-[#f7f9fc] sticky top-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative flex items-center neumorphic-inset rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/20">
              <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
              <input 
                className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full font-body" 
                placeholder="Search transactions or entities..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-600 hover:bg-white/50 rounded-lg transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface">Alex Stratton</p>
                <p className="text-[10px] text-slate-500 font-label uppercase tracking-wider">CFO, TechFlow</p>
              </div>
              <img 
                alt="User Profile" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhAj6S4kt83Py4JD1Yd7SIc1ZF3HdygHOPumB6IsNoSuo2-gyKCQ4vVp_0h2e0Kf7J0Vzv35Hy5Pw8FQ3qbzbZPbniMRhp_2loT7cthIb7w4ne4HySgG9OZedhuuuIL8OEu4bxTFcJ3ffi_Dl2ns1_x7EAFeM75vayJcktYwV-Y1H44t29Kmp7J0th-JuzTMD9RrCBB6qUrWm9zsXQcYJfjjZrpZubfdjqLPJBzBQ_Dyh4_DKLl73l99-5zPHITp_uH066tl6KZTXL"
              />
            </div>
          </div>
        </header>

        {/* Outlet for Pages */}
        <Outlet />
      </main>
    </div>
  );
}
