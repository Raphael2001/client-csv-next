import { configureStore } from "@reduxjs/toolkit";
import Reducers from "redux-store/reducers";

const Store = configureStore({
  reducer: Reducers,
  /* remove warning for non serialized data in store */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
