import type { Id } from './id';

export type UserId = string;

export interface User {
  editing: {
    boardId: Id;
    columnId: Id;
    itemId: Id;
    listId: Id;
  };
  email: string | null;
  emailVerified: boolean;
  hideLikes: boolean;
  id: UserId;
}
