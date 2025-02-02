import CssBaseline from '@mui/material/CssBaseline';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import routes from 'src/routes';
import { store } from 'src/store';

const router = createBrowserRouter(createRoutesFromElements(routes));

export default function App() {
  return (
    <StrictMode>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
}
