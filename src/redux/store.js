/* How to access data in other files?

// Import
import { useSelector, useDispatch } from "react-redux";
import { changeContent, resetContent } from "../../redux/userSlice";

// In the beginning of the component or screen
const xxList = useSelector((state) => state.user.xxList);
const dispatch = useDispatch();

// Call reducer
dispatch(changeContent({ index: index, change: 1 }));

*/

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import redux slice here
import SettingsReducer from "./settingsSlice";
import EyeCheckDataReducer from "./eyeCheckDataSlice";
import QnAReducer from "./QnASlice";

import SelectedEyeReducer from "./selectedEyeSlice";
import TempDataReducer from "./tempDataSlice";
import UserReducer from "./userSlice";
// End of slice

import { initLocale } from "../i18n/utils";

const mainPersistConfig = {
  key: "main",
  storage: AsyncStorage,
  // Whitelist (Save these states to local storage)
  whitelist: ["settings", "user", "QnA"],
  // Blacklist (Don"t save these states)
  blacklist: [],
};

// rootReducer, wrapped by a persist reducer
const rootReducer = persistReducer(
  mainPersistConfig,
  combineReducers({
    // Add redux slice here
    settings: SettingsReducer,
    eyeCheckData: EyeCheckDataReducer,
    QnA: QnAReducer,
    selectedEye: SelectedEyeReducer,
    tempData: TempDataReducer,
    user: UserReducer,
    // End of slice
  })
);

// Redux: Store
const store = createStore(rootReducer, applyMiddleware(thunk));

// Middleware: Redux Persist Persister
const persistor = persistStore(store, null, () => {
  // init language
  initLocale?.call(store?.getState()?.settings?.language);
});

export { store, persistor };
