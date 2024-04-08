import React from 'react';
import './index.css';

import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './api/store';
import App from './App';
import AuthState from './context/auth/AuthState';
import SocketState from './context/socket/SocketState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthState>
        <SocketState>
          <SnackbarProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SnackbarProvider>
        </SocketState>
      </AuthState>
    </Provider>
  </React.StrictMode>
);
