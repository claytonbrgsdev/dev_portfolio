// // src/redux/store.ts

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import { persistStore, persistReducer } from 'redux-persist';

// // Rename imports to clearly indicate they are reducers
// import authReducer from './slices/authSlice';
// import productsReducer from './slices/productsSlice';
// import cartReducer from './slices/cartSlice';
// import artistsReducer from './slices/artistsSlice';
// import releasesReducer from './slices/releasesSlice';
// import mediaReducer from './slices/mediaSlice';
// import radioshowsReducer from './slices/radioshowsSlice';
// import orderReducer from './slices/orderSlice';
// import currencyReducer from '@redux/slices/currencySlice';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   products: productsReducer,
//   cart: cartReducer,
//   artists: artistsReducer,
//   releases: releasesReducer,
//   media: mediaReducer,
//   radioshows: radioshowsReducer,
//   orders: orderReducer,
//   currency: currencyReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth', 'cart'], // Only persist auth and cart slices
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// // **RootState and AppDispatch Types**
// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;