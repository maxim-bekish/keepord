import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { itemsAllURL,itemsURL  } from "./../constants/api";
export const fetchDataItem = createAsyncThunk(
  "stateName/fetchDataItem",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(itemsAllURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (response.status === 401) {
        window.location.replace("/login");
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


export const thingsCard = createAsyncThunk(
  "stateName/thingsCard",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(itemsURL+'/1', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (response.status === 401) {
        window.location.replace("/login");
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
    card:[],
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
    [thingsCard.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [thingsCard.fulfilled]: (state, action) => {
      state.status = "resolve";
      state.card = action.payload;
    },
    [thingsCard.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default testSlice.reducer;
