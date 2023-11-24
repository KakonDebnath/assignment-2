import { Request, Response } from 'express';
import UserZodValidationSchema from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodValidateData = UserZodValidationSchema.parse(userData);
    const result = await UserServices.createUser(zodValidateData);
    // const { password, ...resultWithoutPassword } = result.toObject();
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sorry user don't created",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Sorry Something went wrong data retrieved failed',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserById(Number(userId));
    if (result === null) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Sorry Something went wrong data retrieved failed',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userData = req.body;
    const result = await UserServices.updateUser(Number(id), userData);
    if (result === null) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Sorry User Update Failed',
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUser(Number(userId));
    if (result.modifiedCount === 0) {
      res.status(500).json({
        success: false,
        message: "Sorry User didn't delete",
        error: {
          code: 404,
          description: 'Delete failed',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sorry User didn't delete",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
