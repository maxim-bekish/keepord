import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    add(state, action) {
      console.log(action);
      state.categories.splice(0, 1, action.payload);
    },
  },
});

export const { add, addTwo } = categoriesSlice.actions;
export default categoriesSlice.reducer;
