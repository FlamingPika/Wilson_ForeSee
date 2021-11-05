import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice for storing temporary data across multiple screens
 */
export const tempData = createSlice({
  name: "tempData",
  initialState: {},
  reducers: {
    // add/update an entry to the temp. object
    pushData: (state, action) => {
      return Object.assign(state, action.payload);
    },
    reset: (state) => {
      Object.assign(state, {});
    },
    print: (state) => {
      console.debug(state);
    },
    remove: (state, action) => {
      let newState = Object.assign(state, {});
      const keys = action.payload.keys;

      keys.forEach((k) => delete newState[k]);
      console.log(newState);
      return newState;
    },
  },
});

export const { pushData, reset, print, remove } = tempData.actions;

export default tempData.reducer;
