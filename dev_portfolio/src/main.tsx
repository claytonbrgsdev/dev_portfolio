import { RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/user/UserProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import AuthObserver from './utils/authObserver/AuthObserver';
import { router } from './routes/Routes';
import './styles/index.css';


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <UserProvider> */}
            {/* <AuthObserver /> */}
            <RouterProvider router={router} />
          {/* </UserProvider> */}
        </PersistGate>
      </Provider>
    </React.StrictMode> 
  );
}

