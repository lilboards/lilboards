import { fireEvent, screen } from '@testing-library/react';
import { boardId, columnId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';

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
    renderWithProviders(<ColumnName {...props} />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: props.name,
      }),
    ).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    renderWithProviders(<ColumnName {...props} name="" />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: props.placeholder,
      }),
    ).toBeInTheDocument();
  });
});

// user can edit (board owner)
describe('edit', () => {
  it('renders input with name', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithProviders(<ColumnName {...props} boardId={board.id} />);
    expect(
      screen.getByLabelText(`Edit column “${props.name}”`),
    ).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithProviders(<ColumnName {...props} boardId={board.id} name="" />);
    expect(
      screen.getByLabelText(`Edit column “${props.placeholder}”`),
    ).toBeInTheDocument();
  });
});

// user can delete (board owner)
describe('delete', () => {
  let board: ReturnType<typeof updateStore.withBoard>;
  const dialogContent = 'This action cannot be undone.';

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('renders dialog with name', () => {
    const columnName = props.name;
    renderWithProviders(<ColumnName {...props} boardId={board.id} />);
    fireEvent.click(screen.getByLabelText(`Delete column “${columnName}”`));
    expect(
      screen.getByText(`Delete column “${columnName}”?`),
    ).toBeInTheDocument();
    expect(screen.getByText(dialogContent)).toBeInTheDocument();
  });

  it('renders dialog with default name', () => {
    const columnName = props.placeholder;
    renderWithProviders(<ColumnName {...props} boardId={board.id} name="" />);
    fireEvent.click(screen.getByLabelText(`Delete column “${columnName}”`));
    expect(
      screen.getByText(`Delete column “${columnName}”?`),
    ).toBeInTheDocument();
    expect(screen.getByText(dialogContent)).toBeInTheDocument();
  });
});
