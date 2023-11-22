"use client";

import { Provider } from "react-redux";
import { reduxStore } from "./store";

export const Providers = ({ children }: React.PropsWithChildren) => (
  <Provider store={reduxStore}>{children}</Provider>
);