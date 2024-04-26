/**
 * Redux hooks
 * Docs: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store/store';

/**
 * Typed useAppDispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed useAppSelector
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
