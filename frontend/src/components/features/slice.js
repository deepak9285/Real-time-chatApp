import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "slice",
  initialState: true,
  reducers: {
    toggleTheme: (state) => {
      return (state = !state);
    },
  },
});

export const { toggleTheme } = slice.actions;
export default slice.reducer;