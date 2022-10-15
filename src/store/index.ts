import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import checkoutReducer from './ducks/checkout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  key: '@paymentCheckout',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  checkoutReducer,
});

const persistedReducer = persistReducer(config, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
