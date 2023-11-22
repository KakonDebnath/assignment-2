import { TUser } from './user.interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new mongoose.Schema<TUser>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, maxlength: [20, "password cannot be more then 20 characters"] },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
});


UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    // hashing password and save into db
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
    next();
  });

// Create the Mongoose model for the user
export const User = mongoose.model<TUser>('User', UserSchema);
