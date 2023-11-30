import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { store } from './store';

import App from './App.tsx';

import './scss/main.scss';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
   <App />
  </PersistGate>
 </Provider>
);
