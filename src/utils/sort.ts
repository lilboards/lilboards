import { SortOrder } from '../types';

export const sort = <Type>(objects: Type[], by: keyof Type, order: SortOrder) =>
  objects.slice().sort((a: Type, b: Type) => {
    switch (order) {
      case SortOrder.Ascending:
        return Number(a[by]) - Number(b[by]);
      case SortOrder.Descending:
        return Number(b[by]) - Number(a[by]);
      default:
        return 0;
    }
  });
