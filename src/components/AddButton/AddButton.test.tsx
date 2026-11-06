import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import AddButton from './AddButton';

it('renders button', () => {
  render(<AddButton />);
  expect(screen.getByRole('button')).toBeVisible();
});

it('renders aria-label', () => {
  render(<AddButton aria-label="label" />);
  expect(screen.getByLabelText('label')).toBeVisible();
});

it('renders text', () => {
  render(<AddButton>text</AddButton>);
  expect(screen.getByText('text')).toBeVisible();
});
