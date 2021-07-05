export interface Board {
  createdAt: number;
  creator: UserId;
  name: string;
  updated: number;
}

export interface Boards {
  [boardId: string]: Board;
}

export interface Column {
  createdAt: number;
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
  createdAt: number;
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

type UserId = Id;
