import {
  ITEM_TEST_ID as itemId,
  COLUMN_TEST_ID as columnId,
} from '../../../constants/test';
import { combine } from './combine';

import type { DropResult } from 'react-beautiful-dnd';

const itemId1 = `${itemId}1`;
const itemId2 = `${itemId}2`;

const item1 = {
  created: Date.now(),
  text: ' Item 1 text ',
  updated: Date.now(),
};

const item2 = {
  created: Date.now(),
  text: '\nItem 2 text\n',
  updated: Date.now(),
};

const items = {
  [itemId1]: item1,
  [itemId2]: item2,
};

it('returns items to update and remove', () => {
  const result: DropResult = {
    combine: {
      draggableId: itemId2,
      droppableId: columnId,
    },
    draggableId: itemId1,
    mode: 'FLUID',
    reason: 'DROP',
    source: {
      droppableId: columnId,
      index: 0,
    },
    type: 'DEFAULT',
  };

  expect(combine(items, result)).toEqual({
    remove: {
      columnId,
      itemId: itemId1,
    },
    update: {
      itemId: itemId2,
      text: `${item2.text.trim()}

---

${item1.text.trim()}`,
    },
  });
});
