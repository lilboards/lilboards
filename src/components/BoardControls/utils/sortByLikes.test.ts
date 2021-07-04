import { sortByLikes } from './sortByLikes';

const column = {
  created: Date.now(),
  name: '',
  updated: Date.now(),
};

const item = {
  created: Date.now(),
  text: '',
  updated: Date.now(),
};

it('returns column item id sorted by likes', () => {
  const columns = {
    column1: {
      ...column,
      itemIds: ['item1', 'item2'],
    },
  };
  const items = {
    item1: {
      ...item,
    },
    item2: {
      ...item,
      likes: {
        user1: true,
      },
    },
  };
  expect(sortByLikes(columns, items)).toEqual({
    column1: ['item2', 'item1'],
  });
});
