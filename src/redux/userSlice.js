import { createSlice } from "@reduxjs/toolkit";
import { DataType } from "../constant/eyeDataType";

const initialState = {
  isPro: false,
  currentMember: null,

  userEmail: "",
  createTime: 0,
  modifiedTime: 0,
  isFirstSignin: true,
  memberList: {},

  qrScanned: false,
  scannedUID: "",
  scannedMemberName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    initFamilyUserRedux: (state, action) => {
      console.log("Redux: setting userBio", action.payload);
      state = { ...state, ...action.payload };
      console.log("after redux seeting userBio", state);
    },

    // add a new member and switch current member to this member
    addFamilyMemberRedux: (state, action) => {
      console.log("Redux: adding member", action.payload.name);
      state.memberList = {
        ...state.memberList,
        [action.payload.name]: action.payload,
      };
      state.currentMember = action.payload;
      state.modifiedTime = action.payload.modifiedTime;
    },

    setIsPro: (state, action) => {
      state.isPro = action.payload;
      console.log("isPro", state.isPro);
    },

    setSelectedPro: (state, action) => {
      console.log("set selectedPro to", action.payload);
      state.selectedPro = action.payload;
    },

    setMemberList: (state, action) => {
      console.log("Redux: setting memberList");
      state.memberList = action.payload;
      //console.log("after redux seeting memberlist", state.createTime);
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    // store the current selected member, if user is family user
    setCurrentMember: (state, action) => {
      console.log("Set current member to", action.payload.name);
      state.currentMember = action.payload;
      //console.log("after redux seeting current member", state.createTime);
    },

    // eyeDataHistory is stored as an array
    addDataRedux: (state, action) => {
      console.log("Redux adding data", action.payload.checkTime);

      if (action.payload.type === DataType.eye) {
        state.currentMember.eyeDataHistory = {
          ...state.currentMember?.eyeDataHistory,
          [action.payload.checkTime]: action.payload,
        };
      } else if (action.payload.type === DataType.glasses) {
        state.currentMember.glassesDataHistory = {
          ...state.currentMember?.glassesDataHistory,
          [action.payload.checkTime]: action.payload,
        };
      }

      state.currentMember.modifiedTime = action.payload.modifiedTime;
      state.memberList = {
        ...state.memberList,
        [state.currentMember.name]: state.currentMember,
      };
    },

    removeDataRedux: (state, action) => {
      console.log("Redux removing data", action.payload.checkTime);

      if (action.payload.type === DataType.eye) {
        delete state.currentMember?.eyeDataHistory[action.payload.checkTime];
      } else if (action.payload.type === DataType.glasses) {
        delete state.currentMember?.glassesDataHistory[
          action.payload.checkTime
        ];
      } else {
        console.log("Redux: data does not have a proper type", action.payload);
        return;
      }

      state.currentMember.modifiedTime = action.payload.modifiedTime;
      state.memberList = {
        ...state.memberList,
        [state.currentMember.name]: state.currentMember,
      };
    },

    print: (state) => {
      console.debug(state);
    },
    reset: (state, action) => {
      console.log("reset userSlice");
      Object.assign(state, initialState);
      console.log(state);
    },
    isQrScanned: (state, action) => {
      state.qrScanned = action.payload;
      console.log("Scanned QR", state.qrScanned);
    },
    storeScannedUID: (state, action) => {
      state.scannedUID = action.payload;
      console.log("Scanned UID stored", state.scannedUID);
    },
    storeScannedMemberName: (state, action) => {
      state.scannedMemberName = action.payload;
      console.log("Scanned Name stored", state.scannedMemberName);
    },
  },
});

export const {
  initFamilyUserRedux,
  addFamilyMemberRedux,
  setIsPro,
  setSelectedPro,
  setMemberList,
  setCurrentMember,
  addDataRedux,
  removeDataRedux,
  print,
  reset,
  isQrScanned,
  storeScannedUID,
  storeScannedMemberName,
} = userSlice.actions;

export default userSlice.reducer;
