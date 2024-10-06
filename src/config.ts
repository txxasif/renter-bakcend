import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
dotenv.config({});

class Config {
  public NODE_ENV: string;
  public PORT: number;
  public CLIENT_URL: string;
  SECRET_KEY_ONE: string;
  SECRET_KEY_TWO: string;
  EMAIL_APP_PASSWORD: string;
  MONGODB_URL: string;
  SENDER_EMAIL: string;
  CLOUD_NAME: string;
  CLOUD_API_KEY: string;
  CLOUD_API_SECRET: string;
  JWT_TOKEN: string;
  constructor() {
    console.log(process.env.SENDER_EMAIL);

    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.PORT = Number(process.env.PORT) || 5000;
    this.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || 'secretKeyOne';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || 'secretKeyTwo';
    this.SENDER_EMAIL = process.env.SENDER_EMAIL || 'JG5gK@example.com';
    this.EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD || 'password';
    this.MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/Jobber';
    this.CLOUD_NAME = process.env.CLOUD_NAME || 'cloud_name';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || 'api_key';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || 'api_secret';
    this.JWT_TOKEN = process.env.JWT_TOKEN || 'jwt_token';
  }
  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET
    });
  }
}

export const config: Config = new Config();
