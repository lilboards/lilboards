import CssBaseline from '@mui/material/CssBaseline';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import Routes from './components/Routes';
import store from './store';

export const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Routes />
        </Layout>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
