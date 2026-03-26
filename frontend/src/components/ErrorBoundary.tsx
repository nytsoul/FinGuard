import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] to-[#f2f4f7] flex items-center justify-center p-4">
            <div className="w-full max-w-md text-center">
              <div className="inline-block w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
                <span className="text-4xl">⚠️</span>
              </div>
              <h1 className="text-2xl font-bold text-on-surface mb-4">
                Something went wrong
              </h1>
              <p className="text-slate-600 mb-6">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-[#004ac6] to-[#0055e0] text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
