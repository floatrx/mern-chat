import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';

/**
 * [Guard decorator] Decorate private components
 * How it works: Decorator checks if user is authenticated and show WrappedComponent, otherwise show nothing!
 * Note: Use for components not for pages! Use route "isPrivate" flag for private pages (config/routes.ts)
 * @decorator
 * @param WrappedComponent - component to display
 * @example
 * export const PrivateActionButton = onlyAuth(
 *   // Wrapped component
 *   (props) => <>Private component</>
 * );
 */
export const onlyAuth =
  <P extends Record<string, any>>(WrappedComponent: React.ComponentType<P>) =>
  (props: P) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (!isLoggedIn) return null;

    return <WrappedComponent {...props} />;
  };
