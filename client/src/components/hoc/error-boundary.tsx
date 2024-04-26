import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: { name: string } | null;
  hasError: boolean;
}

/**
 * Error Boundary Component
 * @see https://reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    console.error('Error Boundary Caught:', error, errorInfo);
  }

  render() {
    const { error, hasError } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120%' }}>
            {error?.name === 'ChunkLoadError' ? (
              <div>This application has been updated, please refresh your browser to see the latest content.</div>
            ) : (
              <div>An error has occurred, please refresh the page and try again.</div>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
