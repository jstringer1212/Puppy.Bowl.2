import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api"; 

// Configure the store to use the API slice's auto-generated reducer and middleware
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 
});

export default store;
