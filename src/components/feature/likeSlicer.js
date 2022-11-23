import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0
};

export const counterSlicer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
})

export const selectCount = (state) => state.counter.value


export const {increment, decrement} = counterSlicer.actions;
export default counterSlicer.reducer;