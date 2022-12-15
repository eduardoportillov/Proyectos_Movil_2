import React from "react";
import { Provider } from "react-redux";
import Navigation from "./src/Navigation";
import { store } from "./src/store";
import pages from "./src/pages";
import { LogBox } from "react-native";

console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function App() {
  return (
    <Provider store={store}>
      <Navigation pages={pages} />
    </Provider>
  );
}

