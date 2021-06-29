import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
} from '../../constants/test';
import Item from './Item';

const props = {
  boardId,
  columnId,
  itemId,
};

it('renders nothing when item does not exist', () => {
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
    expect(screen.queryByLabelText(/Delete item/)).not.toBeInTheDocument();
  });
});
