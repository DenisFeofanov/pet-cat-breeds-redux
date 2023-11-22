import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import charactersReducer from "./charactersSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const reduxStore = configureStore({
  reducer: { characters: charactersReducer },
});

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
