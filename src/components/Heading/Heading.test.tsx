import { fireEvent, render, screen } from '@testing-library/react';
import { copyLinkToClipboard } from 'src/utils';
import { expect, it, vi } from 'vitest';

import Heading from './Heading';

vi.mock('src/utils');

const props = {
  children: 'Heading',
};

it('renders children', () => {
  render(<Heading {...props} />);
  expect(screen.getByText(props.children)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText(props.children),
  );
});

it('does not render link', () => {
  render(<Heading {...props} />);
  expect(screen.getByText(props.children)).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

it('does not copy link to clipboard', () => {
  render(<Heading {...props} link />);
  expect(screen.getByLabelText('Copy link')).toBeInTheDocument();
  expect(copyLinkToClipboard).not.toHaveBeenCalled();
});

it('copies link to clipboard', () => {
  render(<Heading {...props} link />);
  fireEvent.click(screen.getByLabelText('Copy link'));
  expect(copyLinkToClipboard).toHaveBeenCalledTimes(1);
});
