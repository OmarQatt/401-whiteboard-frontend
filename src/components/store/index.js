import { configureStore } from "@reduxjs/toolkit";
import Like from "../feature/likeSlicer";

export const store = configureStore({
  reducer: {
    counter: Like
  }
})