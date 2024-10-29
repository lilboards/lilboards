import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, store, updateStore } from 'test/utils';

import Column from './Column';

const props = {
  boardId: '',
  columnId: '',
  columnIndex: 0,
};

it('renders nothing when there is no column', () => {
  renderWithProviders(<Column {...props} />);
  expect(screen.queryByPlaceholderText(/Column/)).toBe(null);
});

it('renders column name', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithProviders(
    <Column {...props} boardId={board.id} columnId={column.id} />,
  );
  expect(screen.getByText(column.name)).toBeInTheDocument();
});

it('edits column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUser();
  renderWithProviders(
    <Column {...props} boardId={board.id} columnId={column.id} />,
  );
  const value = 'Edited Column Name';
  fireEvent.change(screen.getByLabelText(`Edit column “${column.name}”`), {
    target: { value },
  });
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

it('resets user editing column id on blur', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUser();
  updateStore.withUserEditing();
  renderWithProviders(
    <Column {...props} boardId={board.id} columnId={column.id} />,
  );
  fireEvent.blur(screen.getByLabelText(`Edit column “${column.name}”`));
  expect(store.getState().user.editing.columnId).toBe('');
});

describe('delete', () => {
  let board: ReturnType<typeof updateStore.withBoard>;
  let column: ReturnType<typeof updateStore.withColumn>;
  const dialogContent = 'This action cannot be undone.';

  beforeEach(() => {
    board = updateStore.withBoard();
    column = updateStore.withColumn();
    updateStore.withUser();
  });

  it('cancels delete', () => {
    renderWithProviders(
      <Column {...props} boardId={board.id} columnId={column.id} />,
    );
    fireEvent.click(screen.getByLabelText(/Delete column/));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText(dialogContent)).not.toBeVisible();
    expect(screen.getByDisplayValue(column.name)).toBeInTheDocument();
  });

  it('deletes column', () => {
    renderWithProviders(
      <Column {...props} boardId={board.id} columnId={column.id} />,
    );
    fireEvent.click(screen.getByLabelText(/Delete column/));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText(dialogContent)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(column.name)).not.toBeInTheDocument();
  });
});
