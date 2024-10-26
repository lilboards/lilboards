import type { ItemId } from './id';
import type { Time } from './time';
import type { UserId } from './user';

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

export interface Item {
  createdAt: Time;
  createdBy: UserId;
  text: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

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
