import { configureStore } from "@reduxjs/toolkit";
import { catalogReducer } from "./catalogSlice";
import { uiReducer } from "./uiSlice";

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

