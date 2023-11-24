import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser): Promise<TUser | null> => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};

const getAllUsers = async (): Promise<TUser[]> => {
  const result = await User.find().select(
    'username fullName age email address',
  );
  return result;
};

const getUserById = async (id: number): Promise<TUser | null> => {
  const result = await User.isUserExist(id);
  return result;
};

const updateUser = async (
  id: number,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await User.findOneAndUpdate({ userId: id }, userData, {
    new: true,
    runValidators: true,
  }).select('userId username fullName age email address isActive hobbies');
  return result;
};

const deleteUser = async (userId: number) => {
  const result = await User.updateOne({ userId: userId }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
