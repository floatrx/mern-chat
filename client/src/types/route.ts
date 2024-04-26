export interface RouteItem {
  // Title for sidebar & document title
  title?: string;
  // Path to render
  path: string;
  // Lazy loaded component (page) to render -> React.lazy( () => import('path') )
  element?: React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>;
  // Nested routes
  children?: RouteItem[];
  // Mark route as private (only for authenticated users)
  isPrivate?: boolean;
  // Icon for sidebar
  icon?: string;
}
