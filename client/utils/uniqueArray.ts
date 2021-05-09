export const uniqueArray = (arr: any[]) => {
  const list = arr.map((val) => JSON.stringify(val));
  const uniqueArray = new Set(list);

  return Array.from(uniqueArray).map((val) => JSON.parse(val));
};
