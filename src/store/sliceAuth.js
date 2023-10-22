import { createSlice } from "@reduxjs/toolkit";

const sliceAuth = createSlice({
  name: "authorization",
  initialState: {
    singIn: false,
  },

  reducers: {
    singInAuth(state, action) {
      console.log(state.singIn);
      state.singIn = action.payload ;
    },
  },
});

export const { singInAuth } = sliceAuth.actions;
export default sliceAuth.reducer;
