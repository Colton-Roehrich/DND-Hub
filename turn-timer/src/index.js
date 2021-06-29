import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

export { default as Navigation } from "./Shared/Navigation";
export { default as Footer } from "./Shared/Footer";
export { default as Home } from "./Pages/Home";
export { default as About } from "./Pages/About";
export { default as Contact } from "./Pages/Contact";
export { default as dTwenty} from "./Components/die/dTwenty";

const storeInstance = createStore(
  combineReducers({
  })
)
ReactDOM.render(
  <Provider store={storeInstance}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
