import {legacy_createStore } from "redux"
import rootreducer from './Reducer/index'
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    version:1,
    storage,
  };
const persistedReducer = persistReducer(persistConfig, rootreducer);

const store = legacy_createStore(
  persistedReducer,
  composeWithDevTools() // Enable Redux DevTools extension
);
const persistor = persistStore(store);
export default store;

export {persistor}
// import {legacy_createStore } from "redux"

// import { composeWithDevTools } from 'redux-devtools-extension';

// // Import your reducers
// import rootreducer from './Reducer/index'




// export default persistor