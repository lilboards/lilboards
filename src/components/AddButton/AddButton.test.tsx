import { render, screen } from '@testing-library/react';

import AddButton from './AddButton';

it('renders button', () => {
  render(<AddButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('renders aria-label', () => {
  render(<AddButton aria-label="label" />);
  expect(screen.getByLabelText('label')).toBeInTheDocument();
});

it('renders text', () => {
  render(<AddButton>text</AddButton>);
  expect(screen.getByText('text')).toBeInTheDocument();
});
