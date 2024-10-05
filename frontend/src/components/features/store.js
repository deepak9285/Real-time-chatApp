import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./slice";
import refreshSidebar from "./refreshSidebar";
//store is capable of storing multiple states
export const store = configureStore({
  reducer: {
    themeKey: themeSliceReducer,
    refreshKey: refreshSidebar,
  },
});