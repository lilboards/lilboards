import { fireEvent, screen } from '@testing-library/react';

import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
  ITEM_TEST_ID as itemId,
} from '../../constants/test';
import { renderWithContext, store, updateStore } from '../../utils/test';
import Item from './Item';

const props = {
  boardId,
  columnId,
  itemId,
};

let item: ReturnType<typeof updateStore.withItem>;

it('does not render for undefined item', () => {
  renderWithContext(<Item {...props} />);
  expect(screen.queryByLabelText(/item/)).toBe(null);
});

it('renders card style', () => {
  const item = updateStore.withItem();
  renderWithContext(
    <Item
      {...props}
      cardStyle={{ backgroundColor: '#64b5f6' }}
      itemId={item.id}
    />
  );
  expect(screen.getByText(item.text)).toBeInTheDocument();
});

it('renders like button and count', () => {
  const item = updateStore.withItem();
  renderWithContext(<Item {...props} itemId={item.id} />);
  expect(screen.getByLabelText(/Like item/)).toBeInTheDocument();
  expect(screen.getByLabelText(/0 likes/)).toBeInTheDocument();
});

describe('delete item', () => {
  beforeEach(() => {
    item = updateStore.withItem();
  });

  it('renders close button', () => {
    renderWithContext(<Item {...props} itemId={item.id} />);
    expect(screen.getByLabelText(/Delete item/)).toBeInTheDocument();
  });

  it('deletes item', () => {
    renderWithContext(<Item {...props} itemId={item.id} />);
    fireEvent.click(screen.getByLabelText(/Delete item/));
    expect(screen.queryByLabelText(/Delete item/)).not.toBeInTheDocument();
  });
});

describe('edit item', () => {
  beforeEach(() => {
    item = updateStore.withItem();
  });

  it('changes item', () => {
    renderWithContext(<Item {...props} itemId={item.id} />);
    const event = { target: { value: 'Item text' } };
    const input = screen.getByLabelText(/Edit item/);
    fireEvent.change(input, event);
    expect(screen.getByDisplayValue(event.target.value)).toBe(input);
  });

  it('focuses item', () => {
    renderWithContext(<Item {...props} itemId={item.id} />);
    fireEvent.focus(screen.getByLabelText(/Edit item/));
    expect(store.getState().user.editing.itemId).toBe(itemId);
  });

  it('blurs item', () => {
    renderWithContext(<Item {...props} itemId={item.id} />);
    fireEvent.blur(screen.getByLabelText(/Edit item/));
    expect(store.getState().user.editing.itemId).toBe('');
  });
});
