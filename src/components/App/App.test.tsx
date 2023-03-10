import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

it('renders without crashing', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText('Lilboards')).toBeInTheDocument();
  });
});
