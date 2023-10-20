import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { itemsURL } from "./../constants/api";

export const fetchTodos = createAsyncThunk(
  "testStateName/fetchTodos",
  async function () {
    const response = await fetch(itemsURL, {
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
  name: "testStateName",
  initialState: {
    testState: [],
    status:null,
    error:null,
  },

  reducers: {
    testAdd(state, action) {
      state.testState = action.payload;
    },
  },
  extraReducers:{

    [fetchTodos.pending]:(state)=>{
      state.status='loading';
      state.error=null;
    },
    [fetchTodos.fulfilled]:(state,action)=>{
      state.status='resolve';
      state.testState=action.payload;

    },
    [fetchTodos.rejected]:(state,action)=>{},
  }
});

export const { testAdd } = testSlice.actions;
export default testSlice.reducer;


//  extraReducers: (builder) => {
//     builder.addCase(fetchCards.pending, (state) => {
//       state.status = "loading";
//     })};