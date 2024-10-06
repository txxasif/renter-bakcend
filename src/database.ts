import mongoose from 'mongoose';
import { config } from '@renter/config';
const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.MONGODB_URL}`);
    console.log('successfully connected to database.');
  } catch (error) {
    console.log('databaseConnection() method error:', error);
  }
};

export { databaseConnection };
