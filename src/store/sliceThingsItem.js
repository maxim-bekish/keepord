import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { itemsURL } from "./../constants/api";

export const thingsCards = createAsyncThunk(
  "itemThingsCard/thingsCard",
  async function (s, { rejectWithValue }) {
    try {
      const response = await fetch(`${itemsURL}/${s.id}`, {
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

const testSlice1 = createSlice({
  name: "itemThingsCard",
  initialState: {
    card: [],
    status: null,
    error: null,
  },

  extraReducers: {
    [thingsCards.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [thingsCards.fulfilled]: (state, action) => {
      state.status = "resolve";
      state.card = action.payload;
    },
    [thingsCards.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default testSlice1.reducer;
