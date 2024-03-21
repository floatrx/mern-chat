import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

import { setupJSONTransform } from '@/lib/transform';
import type { IUserDocument, IUserModel } from '@/types/user';

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: 'String', required: true },
    email: { type: 'String', unique: true, required: true },
    password: { type: 'String', required: true },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

/**
 * Match user entered password to hashed password in database
 * @param enteredPassword
 */
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Hash password before saving to database
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

setupJSONTransform(userSchema);

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export { User };
