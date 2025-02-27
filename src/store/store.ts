import { configureStore, combineReducers } from "@reduxjs/toolkit";
import snackbarSlice  from "./slice/snackbarSlice";

const rootReducer = combineReducers({
  snackbars: snackbarSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
