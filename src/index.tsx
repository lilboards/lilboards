import { StrictMode } from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes';
// import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <Routes />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
