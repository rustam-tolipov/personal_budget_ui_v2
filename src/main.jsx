import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { createHashHistory } from 'history';

import App from './App.jsx';
import './index.css';

import store from './redux/index.js';
export const history = createHashHistory();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
