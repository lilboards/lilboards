import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders, store, updateStore } from '../../../test/utils';
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

let item: ReturnType<typeof updateStore.withItem>;

it('does not render for undefined item', () => {
  renderWithProviders(<Item {...props} />);
  expect(screen.queryByLabelText(/item/)).toBe(null);
});

it('renders card style', () => {
  const item = updateStore.withItem();
  renderWithProviders(
    <Item
      {...props}
      cardStyle={{ backgroundColor: '#64b5f6' }}
      itemId={item.id}
    />,
  );
  expect(screen.getByText(item.text)).toBeInTheDocument();
});

it('renders like button and count', () => {
  const item = updateStore.withItem();
  renderWithProviders(<Item {...props} itemId={item.id} />);
  expect(screen.getByLabelText(`Like item "${item.text}"`)).toBeInTheDocument();
  expect(screen.getByLabelText(/0 likes/)).toBeInTheDocument();
});

describe('delete item', () => {
  beforeEach(() => {
    item = updateStore.withItem();
  });

  it('renders delete button', () => {
    renderWithProviders(<Item {...props} itemId={item.id} />);
    expect(
      screen.getByLabelText(`Delete item “${item.text}”`),
    ).toBeInTheDocument();
  });

  it('deletes item', () => {
    renderWithProviders(<Item {...props} itemId={item.id} />);
    fireEvent.click(screen.getByLabelText(`Delete item “${item.text}”`));
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByLabelText(/Delete item/)).not.toBeInTheDocument();
  });
});

describe('edit item', () => {
  beforeEach(() => {
    item = updateStore.withItem();
  });

  it('changes item', () => {
    renderWithProviders(<Item {...props} itemId={item.id} />);
    const event = { target: { value: 'Item text' } };
    const input = screen.getByLabelText(`Edit item “${item.text}”`);
    fireEvent.change(input, event);
    expect(screen.getByDisplayValue(event.target.value)).toBe(input);
  });

  it('focuses item', () => {
    renderWithProviders(<Item {...props} itemId={item.id} />);
    fireEvent.focus(screen.getByLabelText(`Edit item “${item.text}”`));
    expect(store.getState().user.editing.itemId).toBe(itemId);
  });

  it('blurs item', () => {
    renderWithProviders(<Item {...props} itemId={item.id} />);
    fireEvent.blur(screen.getByLabelText(`Edit item “${item.text}”`));
    expect(store.getState().user.editing.itemId).toBe('');
  });
});
