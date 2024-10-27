import { fireEvent, screen } from '@testing-library/react';
import { boardId, columnId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';

import Items from './Items';

describe('add item', () => {
  it('renders "Add item" button', () => {
    renderWithProviders(<Items boardId={boardId} columnId={columnId} />);
    expect(
      screen.getByRole('button', { name: 'Add item' }),
    ).toBeInTheDocument();
  });

  it('renders new item', () => {
    const column = updateStore.withColumn();
    renderWithProviders(<Items boardId={boardId} columnId={column.id} />);
    fireEvent.click(screen.getByText('Add item'));
    expect(screen.getByLabelText('Edit item “”')).toBeInTheDocument();
  });

  it('focuses on new item', () => {
    const column = updateStore.withColumn();
    renderWithProviders(<Items boardId={boardId} columnId={column.id} />);
    fireEvent.click(screen.getByText('Add item'));
    expect(screen.getByLabelText(/Edit item/)).toHaveFocus();
  });
});
