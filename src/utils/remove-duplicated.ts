export const removeDuplicated = (array: string[]) => {
  return Array.from(new Set(array));
};
