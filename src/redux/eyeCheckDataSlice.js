import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  date: moment().startOf("day"),
  height: 0,
  glassesName: "",

  vau: {
    od: 0,
    os: 0,
  },
  vaa: {
    od: 0,
    os: 0,
  },
  sph: {
    od: 0,
    os: 0,
  },
  cyl: {
    od: 0,
    os: 0,
  },
  axis: {
    od: 0,
    os: 0,
  },
  pd: 0,
};

/**
 * Slice for eye check data
 */
export const eyeCheckDataSlice = createSlice({
  name: "eyeCheckData",
  // TODO default height and age should use current member values
  initialState,
  reducers: {
    set: (state, action) => {
      const payload = action.payload;

      const updated = Object.keys(payload).map((key) => {
        const value = payload[key];

        if (value instanceof Object)
          return { [key]: Object.assign(state[key], value) };
        else return { [key]: value };
      });

      return Object.assign(state, ...updated);
    },
    reset: () => initialState,
    print: (state) => console.debug(JSON.stringify(state, null, 2)),
  },
});

export const { set, get, reset, print } = eyeCheckDataSlice.actions;
export default eyeCheckDataSlice.reducer;
