import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
} from '../../constants/test';
import Items from './Items';

describe('add item', () => {
  it('renders "Add item" button', () => {
    renderWithStore(<Items boardId={boardId} columnId={columnId} />);
    expect(
      screen.getByRole('button', { name: 'Add item' })
    ).toBeInTheDocument();
  });

  it('renders new item', () => {
    const column = updateStore.withColumn();
    renderWithStore(<Items boardId={boardId} columnId={column.id} />);
    fireEvent.click(screen.getByText('Add item'));
    expect(screen.getByLabelText(/Delete item/)).toBeInTheDocument();
  });
});
