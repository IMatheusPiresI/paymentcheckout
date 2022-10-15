import React from 'react';
import 'react-native-gesture-handler';

import {NativeBaseProvider} from 'native-base';
import AppRoutes from './src/routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <AppRoutes />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
