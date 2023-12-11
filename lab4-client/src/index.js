import React, {createContext} from 'react';
import UserStore from './store/UserStore';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminStore from './store/AdminStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    admin: new AdminStore()
  }}>
    <App />
  </Context.Provider>,
);


