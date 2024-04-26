import { validateEmail, validatePassword, validateString } from '@/validators/index';
import { z } from 'zod';

const name = validateString('Username').regex(/^[a-zA-Z.\-_\s]+$/, { message: 'Username contains invalid characters.' });
const email = validateEmail('Email');
const password = validatePassword('Password');

export const createUserSchema = z.object({ name, email, password });

export const updateUserSchema = z.object({ name, email, password: password.or(z.string().optional()) });

export const loginUserSchema = z.object({ email, password });
