import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import shishaReducer from "../app/slices/shishas";
import orderReducer from "../app/slices/orders";
import sessionReducer from "../app/slices/session";

export const store = configureStore({
  reducer: {
    shishas: shishaReducer,
    orders: orderReducer,
    session: sessionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
