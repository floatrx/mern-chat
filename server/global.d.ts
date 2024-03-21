declare interface IErrorResponse {
  message: string; // error message
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      NODE_ENV: 'development' | 'production';

      // Initial data
      DEFAULT_PASSWORD: string;

      // AWS
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      S3_REGION: string;
      S3_BUCKET: string;

      // JWT
      TOKEN_SECRET_KEY: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
    }
  }
}
