import { fireEvent, screen } from '@testing-library/react';
import { listId, rowId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';

import ListItems from '.';

describe('add item', () => {
  it('renders "Add item" button', () => {
    renderWithProviders(<ListItems listId={listId} rowId={rowId} />);
    expect(
      screen.getByRole('button', { name: 'Add item' }),
    ).toBeInTheDocument();
  });

  it('renders new item', () => {
    const row = updateStore.withRow();
    renderWithProviders(<ListItems listId={listId} rowId={row.id} />);
    fireEvent.click(screen.getByText('Add item'));
    expect(screen.getByLabelText('Edit item “”')).toBeInTheDocument();
  });

  it('focuses on new item', () => {
    const row = updateStore.withRow();
    renderWithProviders(<ListItems listId={listId} rowId={row.id} />);
    fireEvent.click(screen.getByText('Add item'));
    expect(screen.getByLabelText(/Edit item/)).toHaveFocus();
  });
});

describe('delete row', () => {
  const dialogContent = 'This action cannot be undone.';

  it('cancels delete', () => {
    const row = updateStore.withRow();
    renderWithProviders(<ListItems listId={listId} rowId={row.id} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Delete row?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText(dialogContent)).not.toBeVisible();
  });

  it('deletes row', () => {
    const row = updateStore.withRow();
    renderWithProviders(<ListItems listId={listId} rowId={row.id} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Delete row?')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Delete')[1]);
    expect(screen.queryByText(dialogContent)).not.toBeVisible();
    expect(screen.queryByDisplayValue(row.name)).not.toBeInTheDocument();
  });
});
