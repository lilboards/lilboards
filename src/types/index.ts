export interface Board {
  created: number;
  name: string;
  updated: number;
}

export interface Column {
  created: number;
  itemIds?: ItemId[];
  name: string;
  updated: number;
}

export interface Columns {
  [columnId: string]: Column;
}

export interface ColumnItemIds {
  [columnId: string]: ItemId[];
}

export type Id = string;

export interface Item {
  created: number;
  likes?: {
    [userId: string]: boolean;
  };
  text: string;
  updated: number;
}

type ItemId = Id;

export interface Items {
  [itemId: string]: Item;
}
