import { fireEvent, screen } from '@testing-library/react';

import {
  COLUMN_TEST_ID as columnId,
  DATE_NOW as dateNow,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../constants/test';
import { firebaseAnalytics } from '../../firebase';
import {
  getStoreState,
  renderWithContext,
  updateStore,
} from '../../utils/test';
import Sort from './Sort';

jest.mock('../../firebase', () => ({
  firebaseAnalytics: {
    logEvent: jest.fn(),
  },
}));

it('logs event when "Sort by likes" button is clicked', () => {
  const board = updateStore.withBoard();
  renderWithContext(<Sort boardId={board.id} />);
  fireEvent.click(screen.getByRole('button', { name: 'Sort by likes' }));
  expect(firebaseAnalytics.logEvent).toBeCalledTimes(1);
  expect(firebaseAnalytics.logEvent).toBeCalledWith('sort_items', {
    by: 'likes',
    order: 'descending',
  });
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
  renderWithContext(<Sort boardId={board.id} />);
  fireEvent.click(screen.getByRole('button', { name: 'Sort by likes' }));
  expect(getStoreState().columns[columnId].itemIds).toEqual([itemId, itemId2]);
});
