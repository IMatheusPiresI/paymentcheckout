import React from 'react';
import 'react-native-gesture-handler';

import {NativeBaseProvider} from 'native-base';
import AppRoutes from './src/routes';
import {Provider} from 'react-redux';
import {store} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppRoutes />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
