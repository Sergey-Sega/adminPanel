import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { carEditReducer } from './reducers/carEditReducer';

const composeEnhancers = compose;

const rootReducer = combineReducers({
  auth: authReducer,
  carEdit: carEditReducer,
});

const store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f,
 ));

export default store;
