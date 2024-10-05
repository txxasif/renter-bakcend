import dotenv from 'dotenv';
dotenv.config({});

class Config {
  public NODE_ENV: string;
  public PORT: number;
  public CLIENT_URL: string;
  SECRET_KEY_ONE: string;
  SECRET_KEY_TWO: string;
  EMAIL_APP_PASSWORD: string;
  SENDER_EMAIL: string;
  constructor() {
    console.log(process.env.SENDER_EMAIL);

    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.PORT = Number(process.env.PORT) || 5000;
    this.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || 'secretKeyOne';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || 'secretKeyTwo';
    this.SENDER_EMAIL = process.env.SENDER_EMAIL || 'JG5gK@example.com';
    this.EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD || 'password';
  }
}

export const config: Config = new Config();
