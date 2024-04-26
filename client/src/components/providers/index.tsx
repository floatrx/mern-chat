import { persistor, store } from "@/store/store";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "./theme-provider";

/**
 * Providers
 * 1. Redux Provider
 * 2. Redux PersistGate
 * 3. Theme Provider
 * 4. React Router Provider
 * @param props
 * @constructor
 */
export const Providers = (props: PropsWithChildren) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider defaultTheme="system">
        <BrowserRouter>{props.children}</BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
