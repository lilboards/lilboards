import { fireEvent, render, screen } from '@testing-library/react';
import { copyLinkToClipboard } from 'src/utils';

import Heading from './Heading';

jest.mock('src/utils', () => ({
  copyLinkToClipboard: jest.fn(),
}));

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

it('copies link to clipboard', () => {
  render(<Heading {...props} link />);
  fireEvent.click(screen.getByLabelText('Copy link'));
  expect(copyLinkToClipboard).toHaveBeenCalledTimes(1);
});
