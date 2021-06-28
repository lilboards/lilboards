import { fireEvent, screen } from '@testing-library/react';
import { getStoreState, renderWithStore, updateStore } from '../../utils/test';
import Column from './Column';

it('renders nothing when there is no column', () => {
  const { baseElement } = renderWithStore(
    <Column boardId="" columnId="" index={0} />
  );
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders column name', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithStore(<Column boardId={board.id} columnId={column.id} index={0} />);
  expect(screen.getByLabelText('Column Name')).toBe(
    screen.getByDisplayValue(column.name)
  );
});

it('edits column', async () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithStore(<Column boardId={board.id} columnId={column.id} index={0} />);
  const value = 'My Column Name';
  fireEvent.change(screen.getByLabelText('Column Name'), { target: { value } });
  expect(await screen.findAllByDisplayValue(value)).toHaveLength(1);
});

it('resets user editing column id on blur', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  updateStore.withUserEditing();
  renderWithStore(<Column boardId={board.id} columnId={column.id} index={0} />);
  fireEvent.blur(screen.getByLabelText('Column Name'));
  expect(getStoreState().user.editing.columnId).toBe('');
});

it('deletes column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithStore(<Column boardId={board.id} columnId={column.id} index={0} />);
  fireEvent.click(screen.getByLabelText(/Delete column/));
  expect(screen.queryByText(column.name)).not.toBeInTheDocument();
});
