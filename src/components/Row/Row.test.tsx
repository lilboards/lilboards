import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, store, updateStore } from 'test/utils';

import Row from '.';

const props = {
  listId: '',
  rowId: '',
  rowIndex: 0,
};

it('renders nothing when there is no row', () => {
  renderWithProviders(<Row {...props} />);
  expect(screen.queryByPlaceholderText(/Row/)).toBe(null);
});

it('renders row name', () => {
  const list = updateStore.withList();
  const row = updateStore.withRow();
  renderWithProviders(<Row {...props} listId={list.id} rowId={row.id} />);
  expect(screen.getByText(row.name)).toBeInTheDocument();
});

it('edits row', () => {
  const list = updateStore.withList();
  const row = updateStore.withRow();
  updateStore.withUser();
  renderWithProviders(<Row {...props} listId={list.id} rowId={row.id} />);
  const value = 'Edited Row Name';
  fireEvent.change(screen.getByLabelText(`Edit row “${row.name}”`), {
    target: { value },
  });
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

it('resets user editing row id on blur', () => {
  const list = updateStore.withList();
  const row = updateStore.withRow();
  updateStore.withUser();
  updateStore.withUserEditing();
  renderWithProviders(<Row {...props} listId={list.id} rowId={row.id} />);
  fireEvent.blur(screen.getByLabelText(`Edit row “${row.name}”`));
  expect(store.getState().user.editing.rowId).toBe('');
});

describe('delete', () => {
  let list: ReturnType<typeof updateStore.withList>;
  let row: ReturnType<typeof updateStore.withRow>;
  const dialogContent = 'This action cannot be undone.';

  beforeEach(() => {
    list = updateStore.withList();
    row = updateStore.withRow();
    updateStore.withUser();
  });

  it('cancels delete', () => {
    renderWithProviders(<Row {...props} listId={list.id} rowId={row.id} />);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText(dialogContent)).not.toBeVisible();
    expect(screen.getByDisplayValue(row.name)).toBeInTheDocument();
  });

  it('deletes row', () => {
    renderWithProviders(<Row {...props} listId={list.id} rowId={row.id} />);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText(dialogContent)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(row.name)).not.toBeInTheDocument();
  });
});
