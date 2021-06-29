import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
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

// TODO: enable when items can be loaded
it.skip('renders nothing when item does not exist', () => {
  const { baseElement } = renderWithStore(<Item {...props} />);
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

describe('delete item', () => {
  beforeEach(() => {
    const item = updateStore.withItem();
    renderWithStore(<Item {...props} itemId={item.id} />);
  });

  it('renders close button', () => {
    expect(screen.getByLabelText(/Delete item/)).toBeInTheDocument();
  });

  it('deletes item', () => {
    fireEvent.click(screen.getByLabelText(/Delete item/));
    // TODO: uncomment when items can be loaded
    // expect(screen.queryByLabelText(/Delete item/)).not.toBeInTheDocument();
  });
});
