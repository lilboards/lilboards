import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, getStoreState, updateStore } from '../../utils/test';
import { generateId } from '../../firebase';
import {
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import BoardControls from './BoardControls';

jest.mock('../../firebase', () => ({
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
    fireEvent.click(screen.getByText('Add column'));
    expect(getStoreState().columns).toEqual({
      [columnId]: {
        createdAt: expect.any(Number),
        name: '',
        updatedAt: expect.any(Number),
      },
    });
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
    const itemId1 = `${itemId}1`;
    const itemId2 = `${itemId}2`;
    const now = Date.now();
    updateStore.withColumns({
      [columnId]: {
        createdAt: now,
        itemIds: [itemId1, itemId2],
        name: '',
        updatedAt: now,
      },
    });
    updateStore.withItems({
      [itemId1]: {
        createdAt: now,
        text: '',
        updatedAt: now,
      },
      [itemId2]: {
        createdAt: now,
        likes: {
          [userId]: true,
        },
        text: '',
        updatedAt: now,
      },
    });
    renderWithStore(<BoardControls boardId={board.id} />);
    fireEvent.click(screen.getByText('Sort by likes'));
    expect(getStoreState().columns[columnId].itemIds).toEqual([
      itemId2,
      itemId1,
    ]);
  });
});
