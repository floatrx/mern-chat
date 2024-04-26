import { Route, Routes } from 'react-router-dom';

import { LazyComponent } from '@/components/hoc/lazy-component';
import { routes } from '@/config/routes';

import type { RouteItem } from '@/types/route';

/**
 * Render routes recursively
 * @param routes
 */
const renderRoutes = (routes?: RouteItem[]) => {
  if (!routes) return null;
  return routes.map((route, index) => (
    <Route key={`${index}-${route.path}`} path={route.path} element={<LazyComponent {...route} />}>
      {'children' in route && renderRoutes(route?.children)}
    </Route>
  ));
};

export const AppRoutes = () => <Routes>{renderRoutes(routes)}</Routes>;
