export const cloneArray = <Type>(array?: Type[]): Type[] =>
  array ? [...array] : [];

export const reorderArray = <Type>(
  array: Type[],
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
