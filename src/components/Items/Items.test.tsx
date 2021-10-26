import { fireEvent, screen } from '@testing-library/react';

import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
} from '../../constants/test';
import { renderWithContext, updateStore } from '../../utils/test';
import Items from './Items';

describe('add item', () => {
  it('renders "Add item" button', () => {
    renderWithContext(<Items boardId={boardId} columnId={columnId} />);
    expect(
      screen.getByRole('button', { name: 'Add item' })
    ).toBeInTheDocument();
  });

  it('renders new item', () => {
    const column = updateStore.withColumn();
    renderWithContext(<Items boardId={boardId} columnId={column.id} />);
    fireEvent.click(screen.getByText('Add item'));
    expect(screen.getByLabelText(/Edit item/)).toBeInTheDocument();
  });

  it('focuses on new item', () => {
    const column = updateStore.withColumn();
    renderWithContext(<Items boardId={boardId} columnId={column.id} />);
    fireEvent.click(screen.getByText('Add item'));
    expect(screen.getByLabelText(/Edit item/)).toHaveFocus();
  });
});
