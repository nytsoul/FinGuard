import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    {
      label: 'View Profile',
      icon: 'person',
      onClick: () => {
        navigate('/dashboard/profile');
        setIsOpen(false);
      }
    },
    {
      label: 'Preferences',
      icon: 'tune',
      onClick: () => {
        setIsOpen(false);
      }
    },
    {
      label: 'Help & Support',
      icon: 'help',
      onClick: () => {
        setIsOpen(false);
      }
    },
    {
      label: 'Settings',
      icon: 'settings',
      onClick: () => {
        navigate('/dashboard/settings');
        setIsOpen(false);
      }
    },
    {
      label: 'Logout',
      icon: 'logout',
      onClick: handleLogout,
      isLogout: true
    }
  ];

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="hidden md:flex flex-col text-right">
          <p className="text-xs font-bold text-on-surface font-poppins">
            {user?.email}
          </p>
        </div>
        <img
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:shadow-md transition-shadow"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhAj6S4kt83Py4JD1Yd7SIc1ZF3HdygHOPumB6IsNoSuo2-gyKCQ4vVp_0h2e0Kf7J0Vzv35Hy5Pw8FQ3qbzbZPbniMRhp_2loT7cthIb7w4ne4HySgG9OZedhuuuIL8OEu4bxTFcJ3ffi_Dl2ns1_x7EAFeM75vayJcktYwV-Y1H44t29Kmp7J0th-JuzTMD9RrCBB6qUrWm9zsXQcYJfjjZrpZubfdjqLPJBzBQ_Dyh4_DKLl73l99-5zPHITp_uH066tl6KZTXL"
        />
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-40">
          {/* User Info Header */}
          <div className="bg-gradient-to-r from-[#f7f9fc] to-[#f2f4f7] p-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <img
                alt="User Profile"
                className="w-12 h-12 rounded-xl border-2 border-white shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhAj6S4kt83Py4JD1Yd7SIc1ZF3HdygHOPumB6IsNoSuo2-gyKCQ4vVp_0h2e0Kf7J0Vzv35Hy5Pw8FQ3qbzbZPbniMRhp_2loT7cthIb7w4ne4HySgG9OZedhuuuIL8OEu4bxTFcJ3ffi_Dl2ns1_x7EAFeM75vayJcktYwV-Y1H44t29Kmp7J0th-JuzTMD9RrCBB6qUrWm9zsXQcYJfjjZrpZubfdjqLPJBzBQ_Dyh4_DKLl73l99-5zPHITp_uH066tl6KZTXL"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-on-surface font-poppins">
                  {user?.email}
                </h3>
              </div>
            </div>
          </div>
          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ' +
                  (item.isLogout
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-slate-600 hover:bg-slate-50')
                }
              >
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
