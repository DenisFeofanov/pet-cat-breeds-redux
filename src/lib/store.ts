import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import charactersReducer from "./charactersSlice";

export const reduxStore = configureStore({
  reducer: { characters: charactersReducer },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
