declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      VITE_PORT: string;
      VITE_API_URL: string;
      SITE_NAME: string;
    }
  }
}
