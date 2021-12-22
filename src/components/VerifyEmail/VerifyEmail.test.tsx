import { fireEvent, render, screen } from '@testing-library/react';

import { sendEmailVerification } from '../../firebase';
import VerifyEmail from './VerifyEmail';

jest.mock('../../firebase', () => ({
  sendEmailVerification: jest.fn(),
}));

describe('send verification email', () => {
  it('renders link', () => {
    render(<VerifyEmail />);
    expect(
      screen.getByRole('button', { name: 'Send verification email' })
    ).toBeInTheDocument();
  });

  it('sends email verification when button is clicked', () => {
    render(<VerifyEmail />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Send verification email' })
    );
    expect(sendEmailVerification).toBeCalled();
    expect(screen.getByText('Email sent')).toBeInTheDocument();
  });
});

describe('logout', () => {
  it('renders button', () => {
    render(<VerifyEmail />);
    expect(screen.getByRole('link', { name: 'Logout' })).toBeInTheDocument();
  });
});
