import { Request, Response } from 'express';
import UserZodValidationSchema from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodValidateData = UserZodValidationSchema.parse(userData);
    const result = await UserServices.createUser(zodValidateData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User don't created",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

export const UserControllers = {
  createUser,
};
