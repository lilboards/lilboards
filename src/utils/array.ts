export const cloneArray = (array?: any[]) => (array ? [...array] : []);

export const reorderArray = (
  array: any[],
  startIndex: number,
  endIndex: number,
) => {
  if (startIndex === endIndex) {
    return array;
  }
  const items = cloneArray(array);
  const [removedItem] = items.splice(startIndex, 1);
  items.splice(endIndex, 0, removedItem);
  return items;
};
