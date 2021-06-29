import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { BOARD_TEST_ID, COLUMN_TEST_ID } from '../../constants/test';
import Items from './Items';

const boardId = BOARD_TEST_ID;
const columnId = COLUMN_TEST_ID;

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
