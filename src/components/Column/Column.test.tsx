import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
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

it('deletes column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithStore(<Column boardId={board.id} columnId={column.id} index={0} />);
  fireEvent.click(screen.getByLabelText(/Delete column/));
  expect(screen.queryByText(column.name)).not.toBeInTheDocument();
});
