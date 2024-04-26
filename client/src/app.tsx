import { Providers } from '@/components/providers';
import { Layout } from '@/components/layout/layout';
import { AppRoutes } from '@/components/router/app-routes';

function App() {
  return (
    <Providers>
      <Layout>
        <AppRoutes />
      </Layout>
    </Providers>
  );
}

export default App;
