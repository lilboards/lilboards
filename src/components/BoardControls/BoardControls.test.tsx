import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, getStoreState, updateStore } from '../../utils/test';
import { generateId } from '../../firebase';
import {
  COLUMN_TEST_ID as columnId,
  DATE_NOW as dateNow,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import BoardControls from './BoardControls';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
  generateId: jest.fn(),
}));

beforeEach(() => {
  (generateId as jest.Mock).mockReturnValue(columnId);
});

it('does not throw error when board is invalid', () => {
  expect(() => {
    renderWithStore(<BoardControls boardId="" />);
  }).not.toThrow();
});

describe('add column', () => {
  it('renders "Add column" button when user can edit', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithStore(<BoardControls boardId={board.id} />);
    expect(
      screen.getByRole('button', { name: 'Add column' })
    ).toBeInTheDocument();
  });

  it('does not render "Add column" button when user cannot edit', () => {
    const board = updateStore.withBoard();
    renderWithStore(<BoardControls boardId={board.id} />);
    expect(
      screen.queryByRole('button', { name: 'Add column' })
    ).not.toBeInTheDocument();
  });

  it('saves new column to store', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithStore(<BoardControls boardId={board.id} />);
    expect(getStoreState().columns).toEqual({});
    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
    fireEvent.click(screen.getByText('Add column'));
    expect(getStoreState().columns).toMatchInlineSnapshot(`
      Object {
        "column_test_id": Object {
          "createdAt": 1234567890,
          "createdBy": "user_test_id",
          "name": "",
        },
      }
    `);
    dateNowSpy.mockRestore();
  });
});

describe('sort', () => {
  it('renders "Sort by likes" button', () => {
    const board = updateStore.withBoard();
    renderWithStore(<BoardControls boardId={board.id} />);
    expect(
      screen.getByRole('button', { name: 'Sort by likes' })
    ).toBeInTheDocument();
  });

  it('sorts column items by likes', () => {
    const board = updateStore.withBoard();
    const itemId2 = `${itemId}2`;
    updateStore.withColumns({
      [columnId]: {
        createdAt: dateNow,
        createdBy: userId,
        itemIds: [itemId2, itemId],
        name: '',
      },
    });
    updateStore.withLike();
    renderWithStore(<BoardControls boardId={board.id} />);
    fireEvent.click(screen.getByText('Sort by likes'));
    expect(getStoreState().columns[columnId].itemIds).toEqual([
      itemId,
      itemId2,
    ]);
  });
});
