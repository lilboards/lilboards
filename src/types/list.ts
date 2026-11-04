import type { ItemId } from './id';
import type { Time } from './time';
import type { UserId } from './user';

export interface List {
  createdAt: Time;
  createdBy: UserId;
  name: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

export type Lists = Record<string, List>;

export interface Row {
  createdAt: Time;
  createdBy: UserId;
  itemIds?: ItemId[];
  name: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

export type Rows = Record<string, Row>;

export type RowItemIds = Record<string, ItemId[]>;

export interface ListItem {
  checked?: boolean;
  createdAt: Time;
  createdBy: UserId;
  text: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

export type ListItems = Record<string, ListItem>;
