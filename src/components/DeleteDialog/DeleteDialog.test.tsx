import { fireEvent, render, screen } from '@testing-library/react';

import DeleteDialog from './DeleteDialog';

const props = {
  content: 'content',
  id: 'id',
  onClose: jest.fn(),
  onDelete: jest.fn(),
  open: true,
  title: 'title',
};

it('renders title and content when dialog is open', () => {
  render(<DeleteDialog {...props} />);
  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText(props.content)).toBeInTheDocument();
});

it('does not render title and content when dialog is not open', () => {
  render(<DeleteDialog {...props} open={false} />);
  expect(screen.queryByText(props.title)).not.toBeInTheDocument();
  expect(screen.queryByText(props.content)).not.toBeInTheDocument();
});

it('calls onClose when "Cancel" is clicked', () => {
  render(<DeleteDialog {...props} />);
  fireEvent.click(screen.getByText('Cancel'));
  expect(props.onClose).toHaveBeenCalledTimes(1);
});

it('calls onDelete when "Delete" is clicked', () => {
  render(<DeleteDialog {...props} />);
  fireEvent.click(screen.getByText('Delete'));
  expect(props.onDelete).toHaveBeenCalledTimes(1);
});
