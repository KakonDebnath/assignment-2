import { Model } from 'mongoose';

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  isDeleted: boolean;
};

export type TProduct = {
  productName: string;
  price: number;
  quantity: number;
};

export interface UserModel extends Model<TUser> {
  isUserExist(id: number): Promise<TUser | null>;
}
