import CssBaseline from '@mui/material/CssBaseline';
import { LocationProvider } from '@reach/router';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import Routes from './components/Routes';
import store from './store';

render(
  <StrictMode>
    <CssBaseline />
    <LocationProvider>
      <Provider store={store}>
        <Layout>
          <Routes />
        </Layout>
      </Provider>
    </LocationProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
