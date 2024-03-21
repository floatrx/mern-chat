export const filterObject = <T extends object>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && typeof value === 'string' && value.trim() !== ''),
  ) as Partial<T>;
};
