import { render, screen } from '@testing-library/react';
import Boards from './Boards';

it('renders boards', () => {
  render(<Boards />);
  expect(screen.getByText('Boards')).toBeInTheDocument();
});
