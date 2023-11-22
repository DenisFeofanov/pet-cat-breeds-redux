import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./charactersSlice";

export const reduxStore = configureStore({
  reducer: { characters: charactersReducer },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
