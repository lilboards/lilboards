import { fireEvent, screen } from '@testing-library/react';
import { logEvent } from 'src/firebase';
import { itemId, listId, rowId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';
import { beforeEach, expect, it, vi } from 'vitest';

import Checkbox from './Checkbox';

vi.mock('src/firebase');

const props = {
  listId,
  rowId,
  itemId,
};

let item: ReturnType<typeof updateStore.withListItem>;

beforeEach(() => {
  item = updateStore.withListItem();
});

it('renders checkbox', () => {
  renderWithProviders(<Checkbox {...props} />);
  expect(screen.getByLabelText(`Check “${item.text}”`)).toBeInTheDocument();
});

it('defaults to unchecked', () => {
  renderWithProviders(<Checkbox {...props} itemId={item.id} />);
  const checkbox = screen.getByLabelText<HTMLInputElement>(/Check/);
  expect(store.getState().listItems[item.id].checked).toBe(undefined);
  expect(checkbox.checked).toBe(false);
});

it('is checked', () => {
  renderWithProviders(<Checkbox {...props} itemId={item.id} />);
  const checkbox = screen.getByLabelText<HTMLInputElement>(/Check/);
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
  expect(store.getState().listItems[item.id].checked).toBe(true);
  expect(logEvent).toHaveBeenCalledTimes(1);
  expect(logEvent).toHaveBeenCalledWith('check_item');
});
