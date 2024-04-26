import { User } from '@/models/user';

import { handleAsyncErrors } from '@/decorators/handle-async-errors';

import type { Request, Response } from 'express';
import type { IUserCreatePayload, IUserCreateResponse, IUserDocument } from '@/types/user';

@handleAsyncErrors
export class UserController {
  /**
   * Get user profile
   * @returns status 200 if OK
   */
  static async list(req: Request<never, IUserDocument[], never, { search: string }>, res: Response<IUserDocument[]>) {
    const keyword = req.query.search
      ? {
          $or: [
            // search by name
            { name: { $regex: req.query.search, $options: 'i' } },
            // or by email
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  }

  /**
   * Create a new user
   * @returns status 201 if user is created
   * @returns status 400 if missing parameters or user already exists
   * @returns status 500 if server error
   */
  static async create(req: Request<never, never, IUserCreatePayload>, res: Response<IUserCreateResponse>) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Email, Name and Password are required');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      console.log('User already exists');
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json(user);
    } else {
      throw new Error('User not created');
    }
  }
}
