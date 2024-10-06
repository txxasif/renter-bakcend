import { IUser } from '@renter/types/User';
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
