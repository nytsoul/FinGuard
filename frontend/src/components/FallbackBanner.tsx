import { useEffect, useState } from 'react';
import { isApiInFallback, getLastApiError } from '../lib/api';

/**
 * FallbackBanner Component
 * 
 * Displays a warning when the API is unavailable and the app is using
 * simulated/fallback data instead of real data.
 */
export default function FallbackBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check every 2 seconds if we're in fallback mode
    const checkInterval = setInterval(() => {
      const fallback = isApiInFallback();
      const err = getLastApiError();
      
      if (fallback) {
        setIsVisible(true);
        setError(err);
      } else {
        setIsVisible(false);
        setError(null);
      }
    }, 2000);

    return () => clearInterval(checkInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b-2 border-yellow-300 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <span className="text-yellow-800 text-2xl mt-0.5">⚠️</span>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-900">API Connection Issue</h3>
          <p className="text-yellow-800 text-sm mt-1">
            Unable to reach the backend API. Showing simulated data for demonstration.
          </p>
          {error && (
            <details className="mt-2 text-xs text-yellow-700">
              <summary className="cursor-pointer font-medium hover:text-yellow-800">
                Error Details
              </summary>
              <code className="block mt-1 bg-yellow-100 p-2 rounded text-yellow-900 overflow-auto">
                {error}
              </code>
            </details>
          )}
          <p className="text-yellow-800 text-xs mt-2 italic">
            Check that your backend is running or environment variables are configured correctly.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-yellow-700 hover:text-yellow-900 font-bold text-lg flex-shrink-0 mt-1"
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
}
