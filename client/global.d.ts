declare interface FindResponse<T> {
  data: T[];
  total: number;
}

declare type ID = string;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      VITE_PORT: string;
      VITE_API_URL: string;
      VITE_SITE_NAME: string;
    }
  }
}
