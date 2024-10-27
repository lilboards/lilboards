import type { DropResult } from '@hello-pangea/dnd';
import { columnId, dateNow, itemId, userId } from 'test/constants';

import { combine } from './combine';

const itemId1 = `${itemId}1`;
const itemId2 = `${itemId}2`;

const item1 = {
  createdAt: dateNow,
  createdBy: userId,
  text: ' Item 1 text ',
};

const item2 = {
  createdAt: dateNow,
  createdBy: userId,
  text: '\nItem 2 text\n',
};

const items = {
  [itemId1]: item1,
  [itemId2]: item2,
};

const likes = {
  [itemId1]: {
    [userId]: true,
  },
  [itemId2]: {
    [userId]: true,
    [`${userId}2`]: true,
  },
};

it('returns items to update and remove', () => {
  const result = {
    combine: {
      draggableId: itemId2,
      droppableId: columnId,
    },
    draggableId: itemId1,
    source: {
      droppableId: columnId,
      index: 0,
    },
  } as DropResult;

  expect(combine(result, items, likes)).toMatchSnapshot();
});
