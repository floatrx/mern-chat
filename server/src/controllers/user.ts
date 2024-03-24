import type { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { generateToken } from '@/lib/utils';
import { User } from '@/models/user';
import type { IUserAuthResponse, IUserBase, IUserCreatePayload, IUserLoginPayload } from '@/types';

/**
 * @description     Get user profile
 * @route           GET /api/users
 * @access          Private
 * @param           {Object} req.query.search - search keyword
 */
export const allUsers = expressAsyncHandler(async (req: Request<never, IUserBase[]>, res: Response) => {
  const keyword = req.query.search
    ? {
        $or: [{ name: { $regex: req.query.search, $options: 'i' } }, { email: { $regex: req.query.search, $options: 'i' } }],
      }
    : {};

  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select('-password');
  res.send(users);
});

/**
 * @description     Register a new user
 * @route           POST /api/users
 * @access          Public
 * @returns         user with token
 */
export const registerUser = expressAsyncHandler(async (req: Request<never, IUserAuthResponse, IUserCreatePayload>, res: Response) => {
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

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

/**
 * @description   Auth user & get token
 * @route         POST /api/users/login
 * @access        Public
 */
export const authUser = expressAsyncHandler(async (req: Request<never, never, IUserLoginPayload>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and Password are required');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});
