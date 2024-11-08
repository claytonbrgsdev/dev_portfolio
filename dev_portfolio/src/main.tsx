import { RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/user/UserProvider';
import React from 'react';
import '@styles/index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import AuthObserver from './utils/authObserver/AuthObserver';
import '@styles/OverrideFonts.css';
import { router } from './routes/Routes';


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserProvider>
            <AuthObserver />
            <RouterProvider router={router} />
          </UserProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

