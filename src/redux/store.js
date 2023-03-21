import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactsSlice";

export const store = configureStore({
  reducer: {
    contactsReducer,
  },
});
