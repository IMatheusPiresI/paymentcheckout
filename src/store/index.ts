import {createStore, combineReducers} from 'redux';
import checkoutReducer from './ducks/checkout';

const rootReducer = combineReducers({
  checkoutReducer,
});

const store = createStore(rootReducer);

export {store};
