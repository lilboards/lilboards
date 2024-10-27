import { userId } from 'test/constants';

import { sortByLikes } from './sortByLikes';

const column = {
  createdAt: Date.now(),
  createdBy: userId,
  name: '',
};

it('returns column item id sorted by likes', () => {
  const columns = {
    column1: {
      ...column,
      itemIds: ['item1', 'item2'],
    },
  };

  const likes = {
    items: {
      item1: {},
      item2: {
        user1: true,
      },
    },
  };

  expect(sortByLikes(columns, likes)).toEqual({
    column1: ['item2', 'item1'],
  });
});
