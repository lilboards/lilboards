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
  const boards = await screen.findAllByText('Open board');
  expect(boards).toHaveLength(1);
});
