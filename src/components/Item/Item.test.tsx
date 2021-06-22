import { render } from '@testing-library/react';
import {
  BOARD_TEST_ID,
  COLUMN_TEST_ID,
  ITEM_TEST_ID,
} from '../../constants/test';
import Item from './Item';

const boardId = BOARD_TEST_ID;
const columnId = COLUMN_TEST_ID;
const itemId = ITEM_TEST_ID;

const props = {
  boardId,
  columnId,
  itemId,
};

it('renders without crashing', () => {
  render(<Item {...props} />);
});
