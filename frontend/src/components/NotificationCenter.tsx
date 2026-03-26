import { useState } from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
  icon: string;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Cash Flow Alert',
      message: 'Your cash runway is now 45 days. Consider optimizing payables.',
      type: 'warning',
      timestamp: '2 hours ago',
      read: false,
      icon: 'warning'
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Invoice #4402 from Nexis Solutions has been paid ($28,500)',
      type: 'success',
      timestamp: '5 hours ago',
      read: false,
      icon: 'check_circle'
    },
    {
      id: 3,
      title: 'Action Required',
      message: 'Invoice #4501 from Vortex Media is overdue by 3 days',
      type: 'error',
      timestamp: '1 day ago',
      read: true,
      icon: 'error'
    },
    {
      id: 4,
      title: 'System Update',
      message: 'CashMind has been updated to v2.4.0 with new features',
      type: 'info',
      timestamp: '2 days ago',
      read: true,
      icon: 'info'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClear = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-100 text-amber-700';
      case 'success':
        return 'bg-emerald-100 text-emerald-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 hover:bg-white/50 rounded-lg transition-colors neumorphic-smooth"
      >
        <span className="material-symbols-outlined">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 max-h-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-y-auto z-40">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg font-poppins">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="divide-y divide-slate-100">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeStyles(notification.type)}`}>
                      <span className="material-symbols-outlined text-sm">
                        {notification.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-sm font-poppins text-on-surface">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-roboto mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-slate-400 font-inter">
                          {notification.timestamp}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClear(notification.id);
                          }}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">
                  notifications_none
                </span>
                <p className="text-sm text-slate-500 font-roboto">
                  All caught up! No new notifications.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-3">
              <button 
                onClick={() => {
                  setShowAllNotifications(true);
                  setIsOpen(false);
                }}
                className="w-full py-2 text-sm font-bold text-primary hover:bg-blue-50 rounded-lg transition-colors font-inter"
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* All Notifications Modal */}
      {showAllNotifications && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowAllNotifications(false)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#f7f9fc] to-[#f2f4f7] p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins text-on-surface">All Notifications</h2>
              <button
                onClick={() => setShowAllNotifications(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Filters */}
            <div className="px-6 py-4 border-b border-slate-100 flex gap-2 flex-wrap">
              <button className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold transition-all">All</button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold transition-all">Unread</button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold transition-all">Warnings</button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold transition-all">Success</button>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer border-l-4 ${
                      notification.type === 'warning' ? 'border-amber-400' :
                      notification.type === 'success' ? 'border-emerald-400' :
                      notification.type === 'error' ? 'border-red-400' :
                      'border-blue-400'
                    } ${!notification.read ? 'bg-blue-50/30' : ''}`}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeStyles(notification.type)}`}>
                        <span className="material-symbols-outlined text-lg">
                          {notification.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-bold text-base font-poppins text-on-surface">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 mt-0.5"></div>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 font-roboto mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-slate-400 font-inter">
                            {notification.timestamp}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClear(notification.id);
                            }}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <span className="material-symbols-outlined text-6xl text-slate-300 mb-2 block">
                    notifications_none
                  </span>
                  <p className="text-lg text-slate-500 font-roboto">
                    All caught up! No notifications.
                  </p>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            {notifications.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 flex gap-3">
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  Mark All as Read
                </button>
                <button
                  onClick={() => {
                    setNotifications([]);
                    setShowAllNotifications(false);
                  }}
                  className="flex-1 py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
