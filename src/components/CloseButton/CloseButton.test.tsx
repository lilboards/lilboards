import { fireEvent, render, screen } from '@testing-library/react';

import CloseButton from './CloseButton';

it('renders button', () => {
  render(<CloseButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('renders aria-label', () => {
  const label = 'label';
  render(<CloseButton aria-label={label} />);
  expect(screen.getByLabelText(label)).toBeInTheDocument();
});

it('handles onClick event', () => {
  const onClick = jest.fn();
  render(<CloseButton onClick={onClick} />);
  fireEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('renders SVG icon props', () => {
  const titleAccess = 'title';
  render(<CloseButton svgIconProps={{ fontSize: 'small', titleAccess }} />);
  expect(screen.getByTitle(titleAccess)).toBeInTheDocument();
});
