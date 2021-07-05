export interface Board {
  createdAt: Time;
  createdBy: UserId;
  name: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

export interface Boards {
  [boardId: string]: Board;
}

export interface Column {
  createdAt: Time;
  createdBy: UserId;
  itemIds?: ItemId[];
  name: string;
  updatedAt?: Time;
  updatedBy?: UserId;
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
  createdBy: UserId;
  likes?: {
    [userId: string]: boolean;
  };
  text: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

type ItemId = Id;

export interface Items {
  [itemId: string]: Item;
}

type Time = ReturnType<typeof Date.now>;

type UserId = Id;
