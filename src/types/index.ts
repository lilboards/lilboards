export interface Board {
  createdAt: number;
  creator: UserId;
  name: string;
  updatedAt: number;
}

export interface Boards {
  [boardId: string]: Board;
}

export interface Column {
  createdAt: number;
  itemIds?: ItemId[];
  name: string;
  updatedAt: number;
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
  updatedAt: number;
}

type ItemId = Id;

export interface Items {
  [itemId: string]: Item;
}

type UserId = Id;
