/**
 * Simulate a delay
 * @param ms - time to wait in milliseconds (default: 100)
 */
export const wait = (ms: number = 1) => new Promise((resolve) => setTimeout(resolve, ms));
