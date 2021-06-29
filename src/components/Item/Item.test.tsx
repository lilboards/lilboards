import { fireEvent, screen } from '@testing-library/react';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
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

describe('invalid item', () => {
  it('renders nothing', () => {
    const { baseElement } = renderWithStore(<Item {...props} />);
    expect(baseElement.firstElementChild).toBeEmptyDOMElement();
  });
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

describe('edit item', () => {
  beforeEach(() => {
    const item = updateStore.withItem();
    renderWithStore(<Item {...props} itemId={item.id} />);
  });

  it('updates item on change', () => {
    const event = { target: { value: 'Item text' } };
    const input = screen.getByLabelText(/Edit item/);
    fireEvent.change(input, event);
    expect(screen.getByDisplayValue(event.target.value)).toBe(input);
  });

  it('focuses on item', () => {
    fireEvent.focus(screen.getByLabelText(/Edit item/));
    expect(getStoreState().user.editing.itemId).toBe(itemId);
  });

  it('blurs on item', () => {
    fireEvent.blur(screen.getByLabelText(/Edit item/));
    expect(getStoreState().user.editing.itemId).toBe('');
  });
});
