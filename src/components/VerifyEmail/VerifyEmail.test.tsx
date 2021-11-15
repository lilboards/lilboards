import { fireEvent, render, screen } from '@testing-library/react';

import { sendEmailVerification } from '../../firebase';
import VerifyEmail from './VerifyEmail';

jest.mock('../../firebase', () => ({
  sendEmailVerification: jest.fn(),
}));

describe('send verification email', () => {
  beforeEach(() => {
    render(<VerifyEmail />);
  });

  it('renders link', () => {
    expect(
      screen.getByRole('button', { name: 'Send verification email' })
    ).toBeInTheDocument();
  });

  it('sends email verification when button is clicked', () => {
    fireEvent.click(
      screen.getByRole('button', { name: 'Send verification email' })
    );
    expect(sendEmailVerification).toBeCalled();
    expect(screen.getByText('Email sent')).toBeInTheDocument();
  });
});

describe('logout', () => {
  beforeEach(() => {
    render(<VerifyEmail />);
  });

  it('renders button', () => {
    expect(screen.getByRole('link', { name: 'Logout' })).toBeInTheDocument();
  });
});
