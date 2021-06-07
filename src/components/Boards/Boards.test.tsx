import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import Boards from './Boards';

beforeEach(() => {
  renderWithStore(<Boards />);
});

it('renders heading', () => {
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText('Boards')
  );
});

it('renders "Create board" button', () => {
  expect(screen.getByLabelText('Create board')).toBeInTheDocument();
});

it('creates board', async () => {
  fireEvent.click(screen.getByLabelText('Create board'));
  const boards = await screen.findAllByLabelText('Board Name');
  expect(boards).toHaveLength(1);
  const input = boards[0];
  expect(screen.getByPlaceholderText('Untitled Board')).toBe(input);
  expect(input).toHaveFocus();
});

it('edits board', async () => {
  fireEvent.click(screen.getByLabelText('Create board'));
  const value = 'My Board Name';
  fireEvent.change(screen.getByLabelText('Board Name'), { target: { value } });
  const inputs = await screen.findAllByDisplayValue(value);
  expect(inputs).toHaveLength(1);
});
