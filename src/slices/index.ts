import { configureStore } from "@reduxjs/toolkit";
import riderReducer from "./riderSlice";

const store = configureStore({
  reducer: {
    riderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
