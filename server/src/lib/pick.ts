/**
 * Pick a subset of properties from an object
 * @param obj - object to pick from
 * @param keys - array of keys to pick
 * @returns object with only the picked keys
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result: Partial<Pick<T, K>> = {};
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  });
  return result as Pick<T, K>;
};
