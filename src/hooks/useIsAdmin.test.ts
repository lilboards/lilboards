import { useIsAdmin } from './useIsAdmin';
import { useSelector } from './useSelector';

jest.mock('./useSelector', () => ({
  useSelector: jest.fn(),
}));

const boardId = 'board-id';
const userId = 'user-id';

it('is not admin when board id is empty', () => {
  (useSelector as jest.Mock).mockImplementationOnce((callback) => callback());
  expect(useIsAdmin('')).toBe(false);
});

it('is not admin when board does not exist', () => {
  const state = {
    boards: {},
  };
  (useSelector as jest.Mock).mockImplementationOnce((callback) =>
    callback(state)
  );
  expect(useIsAdmin(boardId)).toBe(false);
});

it('is not admin when created by does not exist', () => {
  const state = {
    boards: {
      [boardId]: {},
    },
  };
  (useSelector as jest.Mock).mockImplementationOnce((callback) =>
    callback(state)
  );
  expect(useIsAdmin(boardId)).toBe(false);
});

it('is not admin when user id does not exist', () => {
  const state = {
    boards: {
      [boardId]: {
        createdBy: userId,
      },
    },
    user: {},
  };
  (useSelector as jest.Mock).mockImplementationOnce((callback) =>
    callback(state)
  );
  expect(useIsAdmin(boardId)).toBe(false);
});

it('is not admin when created by does not match user id', () => {
  const state = {
    boards: {
      [boardId]: {
        createdBy: userId,
      },
    },
    user: {
      id: `${userId}2`,
    },
  };
  (useSelector as jest.Mock).mockImplementationOnce((callback) =>
    callback(state)
  );
  expect(useIsAdmin(boardId)).toBe(false);
});

it('is admin when created by matches user id', () => {
  const state = {
    boards: {
      [boardId]: {
        createdBy: userId,
      },
    },
    user: {
      id: userId,
    },
  };
  (useSelector as jest.Mock).mockImplementationOnce((callback) =>
    callback(state)
  );
  expect(useIsAdmin(boardId)).toBe(true);
});
