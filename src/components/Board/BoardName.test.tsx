import { render, screen } from '@testing-library/react';

import BoardName from './BoardName';

it('renders nothing when there is no name', () => {
  render(<BoardName />);
  expect(screen.queryAllByRole('heading')).toHaveLength(0);
});

it('renders board name', () => {
  const name = 'Board Name';
  render(<BoardName name={name} />);
  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText(name)
  );
});
