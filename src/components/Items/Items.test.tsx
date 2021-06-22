import { render, screen } from '@testing-library/react';
import { BOARD_TEST_ID, COLUMN_TEST_ID } from '../../constants/test';
import Items from './Items';

it('renders "Add item" button', () => {
  render(<Items boardId={BOARD_TEST_ID} columnId={COLUMN_TEST_ID} />);
  expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
});
