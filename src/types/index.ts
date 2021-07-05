export interface Board {
  createdAt: Time;
  createdBy: UserId;
  name: string;
  updatedAt: Time;
}

export interface Boards {
  [boardId: string]: Board;
}

export interface Column {
  createdAt: Time;
  itemIds?: ItemId[];
  name: string;
  updatedAt: Time;
}

export interface Columns {
  [columnId: string]: Column;
}

export interface ColumnItemIds {
  [columnId: string]: ItemId[];
}

export type Id = string;

export interface Item {
  createdAt: Time;
  likes?: {
    [userId: string]: boolean;
  };
  text: string;
  updatedAt: Time;
}

type ItemId = Id;

export interface Items {
  [itemId: string]: Item;
}

type Time = ReturnType<typeof Date.now>;

type UserId = Id;
