import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Spinner } from "@ui-kitten/components";

import { GlobalContext } from "../context/GlobalState";

export class LoadingScreen extends Component {
  static contextType = GlobalContext;
  componentWillMount = () => {
    this.checkLogin();
  };
  checkLogin = async () => {
    // this.props.navigation.navigate("Login");
    try {
      let value = await AsyncStorage.getItem("token");
      if (value !== null) {
        value = JSON.parse(value);
        console.log(value);
        this.context.setLoginInfo(value);
        if (value.access_right == "user") {
          this.props.navigation.replace("UserHomeScreen");
        } else if (value.access_right == "provider") {
          this.props.navigation.replace("ProviderHomeScreen");
        } else {
          this.props.navigation.replace("Login");
        }
      } else {
        this.props.navigation.replace("Login");
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
      this.props.navigation.replace("Login");
    }
  };
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Spinner color="blue" />
      </View>
    );
  }
}

export default LoadingScreen;
