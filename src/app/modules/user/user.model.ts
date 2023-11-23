import { TUser, UserModel } from './user.interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new mongoose.Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, trim: true },
  password: {
    type: String,
    required: true,
    maxlength: [20, 'password cannot be more then 20 characters'],
  },
  fullName: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
});

// add password for save to database
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

UserSchema.post('save', async function (doc, next) {
  if(doc.password){
    delete doc.password;
  }
  next();
});

// create static methods

UserSchema.statics.isUserExist = async function (id: number) {
  const existingUser = await User.findOne({ userId: id }).select(
    'userId username fullName age email address isActive hobbies',
  );
  return existingUser;
};

// Create the Mongoose model for the user
export const User = mongoose.model<TUser, UserModel>('User', UserSchema);
