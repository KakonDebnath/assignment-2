import { IOrder, IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find().select(
    'username fullName age email address',
  );
  return result;
};

const getUserById = async (id: number): Promise<IUser | null> => {
  const result = await User.isUserExist(id);
  return result;
};

const updateUser = async (
  id: number,
  userData: IUser,
): Promise<IUser | null> => {
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

// const addNewProductToOrder = async (
//   userId: number,
//   product: IOrder,
// ) => {
//   const user = await User.findOneAndUpdate({ userId }, product, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     throw new Error('User not found');
//   }

//   const orders = user.orders || [];
//   orders.push(product);
//   user.orders = orders;

//   await user.save();
//   return user;
// };

export const addProductToOrders = async (
  userId: number,
  productData: { productName: string; price: number; quantity: number },
) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error('This User does not exist');
  }
  if (user.orders) {
    user.orders.push(productData);
  } else {
    user.orders = [productData];
  }
  await user.save({ validateBeforeSave: false });
  return user;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addProductToOrders,
};
