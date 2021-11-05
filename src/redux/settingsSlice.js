import { createSlice } from "@reduxjs/toolkit";
import I18n from "i18n-js";

const defaultSettings = {
  isFirstLaunch: true,
  isFirstSignin: true,
  language: null,
  isFamilyUser: true,
};

/**
 * A persistent slice for storing user preferences and launch state of the app
 */
export const settingsSlice = createSlice({
  name: "settings",

  initialState: defaultSettings,

  reducers: {
    switchLanguage: (state, action) => {
      const locale = action.payload;
      I18n.locale = locale;
      state.language = locale;
      console.log("Language switched to", locale);
    },

    setIsFirstLaunch: (state, action) => {
      console.log("Redux: Set isFirstLaunch to", action.payload);
      state.isFirstLaunch = action.payload;
    },

    setIsFirstSignin: (state, action) => {
      console.log("Redux: Set isFirstSignin to", action.payload);
      state.isFirstSignin = action.payload;
    },
    setIsFamilyUser: (state, action) => {
      state.isFamilyUser = action.payload;
    },
  },
});

export const {
  switchLanguage,
  setIsFirstLaunch,
  setIsFirstSignin,
  setIsFamilyUser,
} = settingsSlice.actions;

export default settingsSlice.reducer;
