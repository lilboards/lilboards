import { StrictMode } from 'react';
import { render } from 'react-dom';
import Home from './home';
// import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <Home />
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
