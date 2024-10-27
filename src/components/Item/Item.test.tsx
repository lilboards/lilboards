import { fireEvent, screen } from '@testing-library/react';
import { boardId, columnId, itemId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

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

it('renders accessible textbox', () => {
  const item = updateStore.withItem();
  renderWithProviders(<Item {...props} itemId={item.id} />);
  expect(screen.getByRole('textbox')).toHaveTextContent(item.text);
});

it('renders link', () => {
  item = updateStore.withItem({ text: 'https://example.com/' });
  renderWithProviders(<Item {...props} itemId={item.id} />);
  expect(screen.getByRole('link')).toHaveTextContent(item.text);
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

  it('clicks and focuses item', () => {
    renderWithProviders(<Item {...props} itemId={item.id} />);
    const textbox = screen.getByLabelText(`Edit item “${item.text}”`);
    fireEvent.click(textbox);
    expect(store.getState().user.editing.itemId).toBe(itemId);
  });

  it('changes item', () => {
    renderWithProviders(<Item {...props} itemId={item.id} />);
    const labelText = `Edit item “${item.text}”`;
    const textbox = screen.getByLabelText(labelText);
    fireEvent.click(textbox);
    const textarea = screen.getByLabelText(labelText);
    const event = { target: { value: 'Item text' } };
    fireEvent.change(textarea, event);
    expect(screen.getByDisplayValue(event.target.value)).toBe(textarea);
  });

  it('blurs item', () => {
    renderWithProviders(<Item {...props} itemId={item.id} />);
    const labelText = `Edit item “${item.text}”`;
    const textbox = screen.getByLabelText(labelText);
    fireEvent.click(textbox);
    const textarea = screen.getByLabelText(labelText);
    fireEvent.blur(textarea);
    expect(store.getState().user.editing.itemId).toBe('');
  });
});
