import { fireEvent, screen } from '@testing-library/react';
import { logEvent } from 'src/firebase';
import { renderWithProviders, store, updateStore } from 'test/utils';
import { beforeEach, expect, it, vi } from 'vitest';

import Delete from './Delete';

vi.mock('src/firebase');

const props = {
  listId: '',
  rowId: '',
  itemId: '',
  itemText: '',
};

beforeEach(() => {
  const list = updateStore.withList();
  const row = updateStore.withRow();
  const item = updateStore.withListItem();
  props.listId = list.id;
  props.rowId = row.id;
  props.itemId = item.id;
  props.itemText = item.text;
});

it('renders delete button', () => {
  renderWithProviders(<Delete {...props} />);
  expect(
    screen.getByLabelText(`Delete “${props.itemText}”`),
  ).toBeInTheDocument();
});

it('deletes item', () => {
  renderWithProviders(<Delete {...props} />);
  fireEvent.click(screen.getByLabelText(`Delete “${props.itemText}”`));
  const state = store.getState();
  expect(state).toMatchObject({
    listItems: {},
  });
  expect(state.rows[props.rowId].itemIds).toEqual([]);
  expect(logEvent).toHaveBeenCalledWith('delete_item');
});
