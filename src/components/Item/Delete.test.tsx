import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, store, updateStore } from 'test/utils';

import Delete from './Delete';

const dialogTitle = 'Are you sure you want to delete?';
const dialogContent = 'This action cannot be undone.';

const props = {
  boardId: '',
  columnId: '',
  itemId: '',
  itemText: '',
};

beforeEach(() => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  const item = updateStore.withItem();
  props.boardId = board.id;
  props.columnId = column.id;
  props.itemId = item.id;
  props.itemText = item.text;
});

it('renders delete button', () => {
  renderWithProviders(<Delete {...props} />);
  expect(
    screen.getByLabelText(`Delete item “${props.itemText}”`),
  ).toBeInTheDocument();
});

it('renders delete dialog', () => {
  renderWithProviders(<Delete {...props} />);
  fireEvent.click(screen.getByLabelText(`Delete item “${props.itemText}”`));
  expect(screen.getByText(dialogTitle)).toBeVisible();
  expect(screen.getByText(dialogContent)).toBeVisible();
});

it('cancels delete', () => {
  renderWithProviders(<Delete {...props} />);
  fireEvent.click(screen.getByLabelText(`Delete item “${props.itemText}”`));
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(screen.getByText(dialogTitle)).not.toBeVisible();
  expect(
    screen.getByLabelText(`Delete item “${props.itemText}”`),
  ).toBeInTheDocument();
});

it('confirms delete', () => {
  renderWithProviders(<Delete {...props} />);
  fireEvent.click(screen.getByLabelText(`Delete item “${props.itemText}”`));
  fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
  expect(screen.getByText(dialogTitle)).not.toBeVisible();
  const state = store.getState();
  expect(state).toMatchObject({
    items: {},
    likes: { items: {} },
  });
  expect(state.columns[props.columnId].itemIds).toEqual([]);
});
