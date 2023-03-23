import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App';
import { initUsers, UserData } from '../app/redux/userSlice';
import context from '../database/dataContextApi';
import { store } from '../app/redux/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

context.getAllUser('getAllUser')
  .then((result: UserData[]) => {
    store.dispatch(initUsers(result));
  })
  .catch();