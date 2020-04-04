import React from "react";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text
} from "@ui-kitten/components";
import { View } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light as lightTheme } from "@eva-design/eva";

import MainNavigator from "./navigation/MainNavigator";
import GlobalState from "./context/GlobalState";

import Colors from "./constants/colors";

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">HOME</Text>
  </Layout>
);

lightTheme["color-primary-500"] = Colors.primary;
const App = () => (
  <GlobalState>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout style={{ flex: 1, marginTop: 20 }}>
        <MainNavigator />
      </Layout>
    </ApplicationProvider>
  </GlobalState>
);

export default App;
