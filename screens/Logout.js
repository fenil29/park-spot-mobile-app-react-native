import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
export class Logout extends Component {
  componentDidMount = () => {
    AsyncStorage.clear();
    this.props.navigation.replace("Login");
  };
  render() {
    return <View></View>;
  }
}

export default Logout;
