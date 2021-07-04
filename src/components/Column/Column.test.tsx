import { fireEvent, screen } from '@testing-library/react';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
import Column from './Column';

const props = {
  boardId: '',
  columnId: '',
  columnIndex: 0,
};

it('renders nothing when there is no column', () => {
  const { baseElement } = renderWithStore(<Column {...props} />);
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders column name', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithStore(
    <Column {...props} boardId={board.id} columnId={column.id} />
  );
  expect(screen.getByText(column.name)).toBeInTheDocument();
});

it('edits column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUser();
  renderWithStore(
    <Column {...props} boardId={board.id} columnId={column.id} />
  );
  const value = 'My Column Name';
  fireEvent.change(screen.getByLabelText('Column Name'), { target: { value } });
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

it('resets user editing column id on blur', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUser();
  updateStore.withUserEditing();
  renderWithStore(
    <Column {...props} boardId={board.id} columnId={column.id} />
  );
  fireEvent.blur(screen.getByLabelText('Column Name'));
  expect(getStoreState().user.editing.columnId).toBe('');
});

it('deletes column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUser();
  renderWithStore(
    <Column {...props} boardId={board.id} columnId={column.id} />
  );
  fireEvent.click(screen.getByLabelText(/Delete column/));
  expect(screen.queryByText(column.name)).not.toBeInTheDocument();
});
