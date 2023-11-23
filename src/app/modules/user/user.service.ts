import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser) => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};
const getAllUsers = async () => {
  const result = await User.find().select(
    'username fullName age email address',
  );
  return result;
};
const getUserById = async (id:number) => {
  const result = await User.findOne({ userId: id }).select("userId username fullName age email address isActive hobbies"); 
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
};
