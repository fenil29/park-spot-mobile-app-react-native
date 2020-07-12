import React, { Component } from "react";
import {
  StyleSheet,
  // Text,
  View,
  Image,
  TextInput,
  // Button,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";

import { Layout, Tab, TabBar, Text } from "@ui-kitten/components";

// import { MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";
// import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

import Colors from "../constants/colors";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default class Login extends Component {
  state = {
    selectedIndex: 0,
  };
  setSelectedIndex = (e) => {
    // console.log(e)
    this.setState({ selectedIndex: e });
  };
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={false}
      >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              // backgroundColor: "#444",
              // alignItems: "center",
              // justifyContent:"center",
              paddingTop: 50,
            }}
          >
            {/* <Image
            source={require("")}
            sc
            style={{
              width: "70%",
              maxWidth: 250,
              height: 70,
              resizeMode: "contain"

              // backgroundColor: "#999"
            }}
          /> */}
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/car.png")}
                sc
                style={{
                  width: "100%",
                  // maxWidth: 250,
                  height: 200,
                  resizeMode: "contain",
                  marginBottom: 10,
                  marginTop: -10,
                  // backgroundColor:"red"

                  // backgroundColor: "#999"
                }}
              />
            </View>

            <TabBar
              selectedIndex={this.state.selectedIndex}
              onSelect={this.setSelectedIndex}
              // indicatorStyle={{backgroundColor:Colors.primary}}
            >
              <Tab title="Sign In">{/* <SignIn Cprops={this.props} /> */}</Tab>
              <Tab title="Sign Up">{/* <SignUp Cprops={this.props} /> */}</Tab>
            </TabBar>
            {this.state.selectedIndex == 0 ? (
              <SignIn Cprops={this.props} />
            ) : (
              <SignUp Cprops={this.props} />
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    flex: 1,
    width: "100%",
    // height:"100%",
    backgroundColor: "#fff",
    // alignItems: "center"
    // justifyContent: 'center',
  },
  tabContainer: {
    minHeight: 64,
  },
});
