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

export const addProductToOrders = async (
  userId: number,
  productData: IOrder,
) => {
  // find user existing or not
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error('This User does not exist');
  }
  // if user order already exists then push new order
  if (user.orders) {
    user.orders.push(productData);
  } else {
    user.orders = [productData];
  }
  await user.save({ validateBeforeSave: false });
  return user;
};

export const getAllProducts = async (userId: number): Promise<IOrder[]> => {
  // find user exist or not
  const user = await User.findOne({ userId: userId });
  if (!user) {
    throw new Error('This User does not exist');
  }
  // if user does not purchase product then throw an error
  if (!user.orders || user.orders.length === 0) {
    throw new Error("This User don't purchase  any order");
  }
  return user.orders;
};

export const getTotalPriceOfOrders = async (userId: number) => {
  // find user exists or not
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error('This user does not exist');
  }
  // if user does not purchase product then throw an error
  if (!user.orders || user.orders.length === 0) {
    throw new Error("This User don't purchase  any order");
  }

  // get total price using mongoose aggregation
  const totalPrice = User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
      
    },
  ])

  return totalPrice
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addProductToOrders,
  getAllProducts,
  getTotalPriceOfOrders
};
