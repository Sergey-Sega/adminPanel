import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { StorageContext } from './StorageContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StorageContext.Provider value={window.localStorage}>
      <App />
      </StorageContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
