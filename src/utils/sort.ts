import { SortOrder } from '../types';

export const sort = <Type, Key extends keyof Type>(
  objects: Type[],
  by: Key,
  order: SortOrder,
) =>
  objects.slice().sort((a: any, b: any) => {
    switch (order) {
      case SortOrder.Ascending:
        return a[by] - b[by];
      case SortOrder.Descending:
        return b[by] - a[by];
      default:
        return 0;
    }
  });
