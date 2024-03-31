import { combineReducers, createStore } from 'redux';

// redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './../reducers/usersReducers';

const rootReducer = combineReducers({
  data: userReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'SPLIT_WITH_FRIENDZZ',
    storage,
  },
  rootReducer
);
const store = createStore(persistedReducer);

export const persistor = persistStore(store);
export default store;
