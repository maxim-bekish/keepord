import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [
 

    ],
  },
  reducers: {
    add(state, action) {
      console.log(state);
      console.log(action);
      state.categories.push(
   
      );
    },
  },
});

export const { add } = categoriesSlice.actions;
export default categoriesSlice.reducer;
