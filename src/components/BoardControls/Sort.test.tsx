import { fireEvent, screen } from '@testing-library/react';

import {
  COLUMN_TEST_ID as columnId,
  DATE_NOW as dateNow,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { logEvent } from '../../firebase';
import { renderWithContext, store, updateStore } from '../../utils/test';
import Sort from './Sort';

jest.mock('../../firebase', () => ({
  logEvent: jest.fn(),
}));

it('renders "Sort by likes" button when user is admin', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithContext(<Sort boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Sort by likes' })
  ).toBeInTheDocument();
});

it('does not render "Sort by likes" button when user is not admin', () => {
  const board = updateStore.withBoard();
  renderWithContext(<Sort boardId={board.id} />);
  expect(
    screen.queryByRole('button', { name: 'Sort by likes' })
  ).not.toBeInTheDocument();
});

it('logs event when "Sort by likes" button is clicked', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
  renderWithContext(<Sort boardId={board.id} />);
  fireEvent.click(screen.getByRole('button', { name: 'Sort by likes' }));
  expect(logEvent).toBeCalledTimes(1);
  expect(logEvent).toBeCalledWith('sort_items', {
    by: 'likes',
    order: 'descending',
  });
});

it('sorts column items by likes', () => {
  const board = updateStore.withBoard();
  updateStore.withUser();
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
  renderWithContext(<Sort boardId={board.id} />);
  fireEvent.click(screen.getByRole('button', { name: 'Sort by likes' }));
  expect(store.getState().columns[columnId].itemIds).toEqual([itemId, itemId2]);
});
