/**
 * Handle errors in a consistent way
 * @param msg - error message string
 * @returns void - throws an error with the message
 */
export const handleError = (msg: string): void => {
  throw new Error(msg);
};
