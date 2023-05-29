import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
import './assests/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// import { composeWithDevTools } from '@redux-devtools/extension/lib/types/logOnly';
import { composeWithDevTools } from '@redux-devtools/extension';
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
