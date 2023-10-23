import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { itemsAllURL } from "../constants/api";

export const fetchDataItem = createAsyncThunk(
  "stateName/fetchDataItem",
  async function () {
    const response = await fetch(itemsAllURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data=await response.json()
    return data;
  }
);
const testSlice = createSlice({
  name: "stateName",
  initialState: {
    dataItem: [],
    status:null,
    error:null,
  },

  reducers: {
    testAdd(state, action) {
      state.dataItem = action.payload;
    },
  },
  extraReducers:{

    [fetchDataItem.pending]:(state)=>{
      state.status='loading';
      state.error=null;
    },
    [fetchDataItem.fulfilled]:(state,action)=>{
      state.status='resolve';
      state.dataItem = action.payload;

    },
    [fetchDataItem.rejected]:(state,action)=>{},
  }
});

export const { testAdd } = testSlice.actions;
export default testSlice.reducer;


