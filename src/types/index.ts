export interface Board {
  created: number;
  name: string;
  updated: number;
}

export interface Column extends Board {
  itemIds?: ItemId[];
}

export type Columns = {
  [columnId: string]: Column;
};

export type ColumnItemIds = {
  [columnId: string]: ItemId[];
};

export type Id = string;

export type Item = {
  created: number;
  likes?: {
    [userId: string]: boolean;
  };
  text: string;
  updated: number;
};

type ItemId = Id;

export type Items = {
  [itemId: string]: Item;
};
