import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import NotificationCenter from './NotificationCenter';
import ProfileDropdown from './ProfileDropdown';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-surface font-roboto text-on-surface antialiased">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Side Navigation */}
      <aside
        className={cn(
          'fixed lg:static h-screen w-64 bg-gradient-to-b from-[#f9fbfd] to-[#f2f4f7] flex flex-col p-4 gap-2 font-poppins tracking-tight shadow-[-4px_0_16px_rgba(180,190,210,0.25),inset_1px_0_0_rgba(255,255,255,0.5)] z-30 border-r border-white/30 transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 mb-4 rounded-2xl neumorphic-elevated mt-8 lg:mt-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all">
            <span className="material-symbols-outlined">security</span>
          </div>
          <div>
            <h1 className="text-lg font-bold font-poppins text-[#7C3AED] tracking-tight">FinGuard</h1>
            <p className="text-[9px] uppercase tracking-[0.12em] text-slate-500 font-semibold">Financial Intelligence</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm',
                  isActive
                    ? 'bg-gradient-to-r from-purple-50 to-violet-50 text-[#7C3AED] neumorphic-card font-semibold scale-[0.98] shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                )
              }
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Settings Link */}
        <div className="mt-auto p-3 border-t border-slate-200/40">
          <NavLink
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm',
                isActive
                  ? 'bg-gradient-to-r from-purple-50 to-violet-50 text-[#7C3AED] neumorphic-card font-semibold scale-[0.98] shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              )
            }
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-surface">
        {/* Top Navigation */}
        <header className="flex justify-between items-center px-4 lg:px-8 w-full h-16 bg-gradient-to-r from-[#f7f9fc] to-[#f2f4f7] sticky top-0 z-10 border-b border-white/50 shadow-sm">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Search Bar - Hidden on small screens */}
          <div className="flex-1 max-w-md lg:max-w-xl ml-2 lg:ml-0">
            <div className="relative flex items-center neumorphic-inset rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20">
              <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
              <input 
                className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full font-roboto hidden md:block" 
                placeholder="Search transactions..." 
                type="text"
              />
              <input 
                className="bg-transparent border-none outline-none focus:ring-0 text-xs w-full font-roboto md:hidden" 
                placeholder="Search..." 
                type="text"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-6 ml-auto">
            {/* Notification Center */}
            <NotificationCenter />

            {/* Divider - Hidden on mobile */}
            <div className="hidden lg:block h-8 w-px bg-slate-200"></div>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
