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

export interface Lists {
  [listId: string]: List;
}

export interface Row {
  createdAt: Time;
  createdBy: UserId;
  itemIds?: ItemId[];
  name: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

export interface Rows {
  [rowId: string]: Row;
}

export interface RowItemIds {
  [rowId: string]: ItemId[];
}

export interface ListItem {
  checked?: boolean;
  createdAt: Time;
  createdBy: UserId;
  text: string;
  updatedAt?: Time;
  updatedBy?: UserId;
}

export interface ListItems {
  [listItemId: string]: ListItem;
}
