import { fireEvent, screen } from '@testing-library/react';

import { renderWithContext, store, updateStore } from '../../utils/test';
import Column from './Column';

const props = {
  boardId: '',
  columnId: '',
  columnIndex: 0,
};

it('renders nothing when there is no column', () => {
  renderWithContext(<Column {...props} />);
  expect(screen.queryByPlaceholderText(/Column/)).toBe(null);
});

it('renders column name', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithContext(
    <Column {...props} boardId={board.id} columnId={column.id} />
  );
  expect(screen.getByText(column.name)).toBeInTheDocument();
});

it('edits column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUser();
  renderWithContext(
    <Column {...props} boardId={board.id} columnId={column.id} />
  );
  const value = 'Edited Column Name';
  fireEvent.change(screen.getByLabelText(`Edit column "${column.name}"`), {
    target: { value },
  });
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

it('resets user editing column id on blur', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUser();
  updateStore.withUserEditing();
  renderWithContext(
    <Column {...props} boardId={board.id} columnId={column.id} />
  );
  fireEvent.blur(screen.getByLabelText(`Edit column "${column.name}"`));
  expect(store.getState().user.editing.columnId).toBe('');
});

it('deletes column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUser();
  renderWithContext(
    <Column {...props} boardId={board.id} columnId={column.id} />
  );
  fireEvent.click(screen.getByLabelText(/Delete column/));
  expect(screen.queryByText(column.name)).not.toBeInTheDocument();
});
