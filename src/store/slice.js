import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    categoriesState: [],
    storageState: [],
  },

  reducers: {
 
    categoriesAdd(state, action) {
      state.categoriesState.splice(0,1,{
        categoriesId: action.payload.id,
      });
    },
    storageAdd(state, action) {
      state.storageState.splice(0,1,{
        storageId: action.payload.id,
      });
    },
  },
});

export const { add, categoriesAdd, storageAdd } = categoriesSlice.actions;
export default categoriesSlice.reducer;
