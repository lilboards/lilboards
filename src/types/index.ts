export interface Board {
  createdAt: Time;
  createdBy: UserId;
  maxLikes?: number;
  name: string;
  timerEnd?: number;
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
  text: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

type ItemId = Id;

export interface Items {
  [itemId: string]: Item;
}

export interface LikesItem {
  [userId: string]: boolean;
}

export interface LikesItems {
  [itemId: string]: LikesItem;
}

export interface Likes {
  items: LikesItems;
}

export enum SortBy {
  createdAt = 'createdAt',
}

export enum SortOrder {
  Ascending,
  Descending,
}

type Time = ReturnType<typeof Date.now>;

export interface User {
  editing: {
    boardId: Id;
    columnId: Id;
    itemId: Id;
  };
  email: string | null;
  emailVerified: boolean;
  id: UserId;
  presenting: boolean;
}

type UserId = Id;
