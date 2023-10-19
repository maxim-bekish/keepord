import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    categoriesState: {},
    storageState: {},
  },

  reducers: {
    categoriesAdd(state, action) {
      state.categoriesState.categoriesId = action.payload.id;
    },
    storageAdd(state, action) {
      state.storageState.storageId = action.payload.id;
    },
  },
});

export const { categoriesAdd, storageAdd } = categoriesSlice.actions;
export default categoriesSlice.reducer;
