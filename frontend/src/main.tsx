import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store.ts';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <CssBaseline/>
          <App/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
