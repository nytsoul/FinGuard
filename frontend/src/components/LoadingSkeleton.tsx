import React from 'react';

const LoadingSkeleton: React.FC<{ fullPage?: boolean }> = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-8">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-10 bg-slate-200 rounded-lg w-1/3 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="neumorphic-card p-6 rounded-xl animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-slate-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="neumorphic-card p-6 rounded-xl animate-pulse mb-8">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-3 bg-slate-200 rounded w-1/12"></div>
                <div className="h-3 bg-slate-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="neumorphic-card p-6 rounded-xl animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 items-center">
                <div className="h-10 bg-slate-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Compact loading skeleton for smaller components
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-12 bg-slate-200 rounded-lg"></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
