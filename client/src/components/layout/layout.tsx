import { type PropsWithChildren } from 'react';

import { useCheckAuthQuery } from '@/api/auth';
import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

import { Toaster } from '@/components/ui/toaster';

/**
 * Main layout
 * - Header (logo & navigation)
 * - Main (greedy height)
 * - Footer
 * @param props
 * @constructor
 */
export const Layout = (props: PropsWithChildren) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // Check auth if session artifacts are present (persisted storage)
  useCheckAuthQuery(undefined, { skip: !isLoggedIn });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container my-8 flex-1">{props.children}</main>

      <Footer />

      <Toaster />
    </div>
  );
};
