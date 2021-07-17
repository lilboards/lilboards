import {
  COLUMN_TEST_ID as columnId,
  DATE_NOW as dateNow,
  ITEM_TEST_ID as itemId,
  USER_TEST_ID as userId,
} from '../../../constants/test';
import { combine } from './combine';

import type { DropResult } from 'react-beautiful-dnd';

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

  expect(combine(result, items)).toMatchInlineSnapshot(`
    Object {
      "remove": Object {
        "columnId": "column_test_id",
        "itemId": "item_test_id1",
      },
      "update": Object {
        "itemId": "item_test_id2",
        "text": "Item 2 text

    ---

    Item 1 text",
      },
    }
  `);
});
