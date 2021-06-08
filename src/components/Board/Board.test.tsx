import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import Board from './Board';

it('renders heading', () => {
  renderWithStore(<Board />);
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText('Board')
  );
});
