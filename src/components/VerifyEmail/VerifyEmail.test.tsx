import { fireEvent, screen } from '@testing-library/react';
import { sendEmailVerification } from 'src/firebase';
import { renderWithProviders } from 'test/utils';

import VerifyEmail from './VerifyEmail';

jest.mock('src/firebase', () => ({
  sendEmailVerification: jest.fn(),
}));

describe('send verification email', () => {
  it('renders link', () => {
    renderWithProviders(<VerifyEmail />);
    expect(
      screen.getByRole('button', { name: 'Send verification email' }),
    ).toBeInTheDocument();
  });

  it('sends email verification when button is clicked', () => {
    renderWithProviders(<VerifyEmail />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Send verification email' }),
    );
    expect(sendEmailVerification).toHaveBeenCalled();
    expect(screen.getByText('Email sent')).toBeInTheDocument();
  });
});

describe('logout', () => {
  it('renders button', () => {
    renderWithProviders(<VerifyEmail />);
    expect(screen.getByRole('link', { name: 'Logout' })).toBeInTheDocument();
  });
});
