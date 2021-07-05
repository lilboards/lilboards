import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
} from '../../constants/test';
import ColumnName from './ColumnName';

const props = {
  boardId,
  columnId,
  name: 'Column Name',
  placeholder: 'Column Placeholder',
};

describe('user cannot edit', () => {
  it('renders name', () => {
    renderWithStore(<ColumnName {...props} />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: props.name,
      })
    ).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    renderWithStore(<ColumnName {...props} name="" />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: props.placeholder,
      })
    ).toBeInTheDocument();
  });
});

describe('user can edit', () => {
  it('renders delete button with name', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithStore(<ColumnName {...props} boardId={board.id} />);
    expect(
      screen.getByLabelText(`Delete column "${props.name}"`)
    ).toBeInTheDocument();
  });

  it('renders delete button with placeholder', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithStore(<ColumnName {...props} boardId={board.id} name="" />);
    expect(
      screen.getByLabelText(`Delete column "${props.placeholder}"`)
    ).toBeInTheDocument();
  });
});
