import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import Route from "./src/navigation/Route";

/*
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

import firebase from "firebase";
import firebaseConfig from "./firebase-config";

// Prevent duplicate app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
*/

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Route />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

export default App;
