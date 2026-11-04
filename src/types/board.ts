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

export type Boards = Record<string, Board>;

export interface Column {
  createdAt: Time;
  createdBy: UserId;
  itemIds?: ItemId[];
  name: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

export type Columns = Record<string, Column>;

export type ColumnItemIds = Record<string, ItemId[]>;

export interface Item {
  createdAt: Time;
  createdBy: UserId;
  text: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

export type Items = Record<string, Item>;

export type LikesItem = Record<string, boolean>;

export type LikesItems = Record<string, LikesItem>;

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
