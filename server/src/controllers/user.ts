import type { Request } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { generateToken } from '@/lib/utils';
import { User } from '@/models/user';
import type { IUserAuthResponse, IUserBase, IUserCreatePayload } from '@/types';

/**
 * @description    Get user profile
 * @route   GET /api/users
 * @access  Private
 * @returns {Object} users list
 * @param   {Object} req.query.search - search keyword
 */
export const allUsers = expressAsyncHandler(async (req: Request<never, IUserBase[]>, res) => {
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
 * @description    Register a new user
 * @route   POST /api/users
 * @access  Public
 * @param   {Object} user { name, email, password }
 * @returns {Object} user with token
 */
export const registerUser = expressAsyncHandler(async (req: Request<never, IUserAuthResponse, IUserCreatePayload>, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Email, Name and Password are required');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
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
 * @description    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 * @param   email
 * @param   password
 * @returns {Object} user
 */
export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

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
