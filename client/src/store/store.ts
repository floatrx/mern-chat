import { api } from "@/api";
import auth from "@/store/auth";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// defaults to localStorage for web

// Combine reducers
export const rootReducer = combineReducers({
  auth,
  [api.reducerPath]: api.reducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Setup store
const setupStore = () =>
  configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true,
        devTools: process.env.NODE_ENV !== "production",
      }).concat([api.middleware]),
  });

export const store = setupStore();
export const persistor = persistStore(store);

/*
 * * Types
 * * https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
 */
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = () => RootState;
