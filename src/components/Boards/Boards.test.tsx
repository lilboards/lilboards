import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import Boards from './Boards';

it('renders boards', () => {
  renderWithStore(<Boards />);
  expect(screen.getByText('Boards')).toBeInTheDocument();
});
