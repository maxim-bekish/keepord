import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { itemsAllURL  } from "./../constants/api";
import { getCookie } from "./getCookie";


export const fetchDataItem = createAsyncThunk(
  "stateName/fetchDataItem",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(itemsAllURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access")}`,
        },
      });
      if (response.status === 401) {
        window.location.replace("/first_page");
      }
      if (!response.ok) {
        throw new Error(`${response.statusText}. Status: ${response.status}`);
      }
      const data = await response.json();
      
      return data;
  
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




const testSlice = createSlice({
  name: "stateName",
  initialState: {
    dataItem: [],

    status: null,
    error: null,
  },

  extraReducers: {
    [fetchDataItem.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchDataItem.fulfilled]: (state, action) => {
      state.status = "resolve";
      state.dataItem = action.payload;
    },
    [fetchDataItem.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
 
  },
});

export default testSlice.reducer;
