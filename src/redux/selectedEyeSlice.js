import { createSlice } from "@reduxjs/toolkit";
import I18n from "i18n-js";

/**
 * Slice for managing selected eye (L/R) in home page and graph pages
 */
export const selectedEye = createSlice({
  name: "selectedEye",

  initialState: "L",
  reducers: {
    setSelectedEye: (state, action) => {
      const eye = action.payload;
      return ["L", "R"].includes(eye) ? eye : state; // check if payload is valid, return previous if invalid
    },
  },
});

export const { setSelectedEye } = selectedEye.actions;

export default selectedEye.reducer;
