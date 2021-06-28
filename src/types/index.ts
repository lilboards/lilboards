export interface Board {
  created: number;
  name: string;
  updated: number;
}

export interface Column extends Board {
  itemIds?: Id[];
}

export type Id = string;
