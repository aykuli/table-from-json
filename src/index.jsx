import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    {console.log(store.getState())}
    <App />
  </Provider>,
  document.getElementById('root')
);
