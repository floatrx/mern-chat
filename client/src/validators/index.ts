import { z } from 'zod';

// Common validation functions
export const validateString = (fieldName: string, min: number = 3) =>
  z.string().min(min, { message: `${fieldName} must be at least ${min} characters.` });

export const validateEmail = (fieldName: string) => validateString(fieldName).email({ message: 'Invalid email.' });

export const validatePassword = (fieldName: string) => validateString(fieldName, 3);
