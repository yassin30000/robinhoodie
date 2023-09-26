import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import thunk from 'redux-thunk';
import session from './session'
import stocksReducer from './stocks'
import opinionsReducer from './opinions'
import watchlistsReducer from './watchlists'
import portfolioReducer from './portfolio';
import portfolioStockReducer from './portfolio_stock';

const rootReducer = combineReducers({
  session,
  stocks: stocksReducer,
  opinions: opinionsReducer,
  watchlists: watchlistsReducer,
  portfolio: portfolioReducer,
  portfolioStock: portfolioStockReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  let store = createStore(persistedReducer, preloadedState, enhancer);
  let persistor = persistStore(store)
  return { store, persistor }
};

export default configureStore;
