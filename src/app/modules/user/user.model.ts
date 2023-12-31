import { IOrder, IUser, UserModel } from './user.interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

const ProductSchema = new mongoose.Schema<IOrder>({
  productName: String,
  price: Number,
  quantity: Number,
});

const UserSchema = new mongoose.Schema<IUser, UserModel>({
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
  orders: [ProductSchema],
});

// query middleware

// add password for save to database
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
UserSchema.post('save', async function (doc, next) {
  if (doc.password) {
    doc.password = '';
  }
  next();
});

UserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
UserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// create static methods
UserSchema.statics.isUserExist = async function (id: number) {
  const isUserExists = await User.findOne({ userId: id }).select(
    'userId username fullName age email address isActive hobbies',
  );
  return isUserExists;
};

// Create the Mongoose model for the user
export const User = mongoose.model<IUser, UserModel>('User', UserSchema);
