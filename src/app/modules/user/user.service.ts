import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser) => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};
const getAllUsers = async () => {
  const result = await User.find().select('username fullName age email address');
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
};
