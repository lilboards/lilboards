import { screen } from '@testing-library/react';

import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
} from '../../constants/test';
import { renderWithContext, updateStore } from '../../utils/test';
import ColumnName from './ColumnName';

const props = {
  boardId,
  columnId,
  name: 'Column Name',
  placeholder: 'Column Placeholder',
};

// user cannot edit (not board owner)
describe('readonly', () => {
  it('renders name', () => {
    renderWithContext(<ColumnName {...props} />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: props.name,
      })
    ).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    renderWithContext(<ColumnName {...props} name="" />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: props.placeholder,
      })
    ).toBeInTheDocument();
  });
});

// user can edit (board owner)
describe('edit', () => {
  it('renders input with name', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithContext(<ColumnName {...props} boardId={board.id} />);
    expect(
      screen.getByLabelText(`Edit column "${props.name}"`)
    ).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithContext(<ColumnName {...props} boardId={board.id} name="" />);
    expect(
      screen.getByLabelText(`Edit column "${props.placeholder}"`)
    ).toBeInTheDocument();
  });
});

// user can delete (board owner)
describe('delete', () => {
  it('renders button with name', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithContext(<ColumnName {...props} boardId={board.id} />);
    expect(
      screen.getByLabelText(`Delete column "${props.name}"`)
    ).toBeInTheDocument();
  });

  it('renders button with placeholder', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithContext(<ColumnName {...props} boardId={board.id} name="" />);
    expect(
      screen.getByLabelText(`Delete column "${props.placeholder}"`)
    ).toBeInTheDocument();
  });
});
