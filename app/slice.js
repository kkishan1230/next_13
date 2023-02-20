import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeState } = slice.actions;

export default slice.reducer;
