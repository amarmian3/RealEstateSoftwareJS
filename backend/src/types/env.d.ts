declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL:      string;
    DATABASE_PORT:     string;
    DATABASE_NAME:     string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
  }
}