import { fireEvent, screen } from '@testing-library/react';
import { itemId, listId, rowId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

import ListItem from '.';

const props = {
  listId,
  rowId,
  itemId,
};

let item: ReturnType<typeof updateStore.withListItem>;

describe('invalid', () => {
  it('does not render for undefined item', () => {
    renderWithProviders(<ListItem {...props} />);
    expect(screen.queryByLabelText(/Check/)).toBe(null);
  });
});

describe('item', () => {
  beforeEach(() => {
    item = updateStore.withListItem();
  });

  it('renders checkbox', () => {
    const item = updateStore.withListItem({ checked: true });
    renderWithProviders(<ListItem {...props} itemId={item.id} />);
    expect(screen.getByLabelText(`Check “${item.text}”`)).toBeInTheDocument();
  });

  it('renders value', () => {
    renderWithProviders(<ListItem {...props} itemId={item.id} />);
    expect(screen.getByDisplayValue(item.text)).toBeInTheDocument();
  });

  it('focuses and blurs item', () => {
    renderWithProviders(<ListItem {...props} itemId={item.id} />);
    const input = screen.getByLabelText(`Edit item “${item.text}”`);
    fireEvent.focus(input);
    expect(store.getState().user.editing.listItemId).toBe(itemId);
    fireEvent.blur(input);
    expect(store.getState().user.editing.itemId).toBe('');
  });

  it('changes item', () => {
    renderWithProviders(<ListItem {...props} itemId={item.id} />);
    const labelText = `Edit item “${item.text}”`;
    const input = screen.getByLabelText(labelText);
    fireEvent.click(input);
    const textarea = screen.getByLabelText(labelText);
    const event = { target: { value: 'ListItem text' } };
    fireEvent.change(textarea, event);
    expect(screen.getByDisplayValue(event.target.value)).toBe(textarea);
  });
});

describe('delete item', () => {
  beforeEach(() => {
    item = updateStore.withListItem();
  });

  it('renders delete button', () => {
    renderWithProviders(<ListItem {...props} itemId={item.id} />);
    expect(
      screen.getByLabelText(`Delete item “${item.text}”`),
    ).toBeInTheDocument();
  });

  it('deletes item', () => {
    renderWithProviders(<ListItem {...props} itemId={item.id} />);
    fireEvent.click(screen.getByLabelText(`Delete item “${item.text}”`));
    expect(screen.queryByLabelText(/Delete item/)).not.toBeInTheDocument();
  });
});
