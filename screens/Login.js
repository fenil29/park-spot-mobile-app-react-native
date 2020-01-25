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
  KeyboardAvoidingView
} from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Segment,
  Content,
  Text,
  Tab,
  Tabs,
  TabHeading
} from "native-base";
// import { MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";
// import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

import Colors from "../constants/colors";

import SignIn from "./SignIn"
import SignUp from "./SignUp"

export default class Login extends Component {
 
 

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={false}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              // backgroundColor: "#444",
              alignItems: "center",
              paddingTop: 50
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
            <Text>FIND MY SPOT</Text>

            {/* <Text
              style={{
                fontSize: 24,
                marginTop: 50,
                marginBottom: 20,
                // backgroundColor: "#888",
                width: "80%",
                textAlign: "center",
                color: Colors.primary
              }}
            >
              Sign in
            </Text> */}
            <Tabs
              tabBarUnderlineStyle={{
                backgroundColor: Colors.primary,
                borderRadius: 10
              }}
              style={{ overflow: "hidden", marginTop: 40 }}

            >
              <Tab
                heading={
                  <TabHeading
                    style={{ backgroundColor: "#fff", shadowColor: "red" }}
                  >
                    <Text style={{ color: Colors.primary }}>Sign In</Text>
                  </TabHeading>
                }
              >
                <SignIn Cprops={this.props}/>
              </Tab>
              <Tab
                heading={
                  <TabHeading style={{ backgroundColor: "#fff" }}>
                    <Text style={{ color: Colors.primary }}>Sign Up</Text>
                  </TabHeading >
                }
              >
                <SignUp Cprops={this.props}/>
              </Tab>
            </Tabs>
            

            {/* <View
            style={{
              flexDirection: "row",
              // backgroundColor: "#333",
              marginVertical: 10,
              width: "70%",
              justifyContent: "space-around"
            }}
          >
            <Text style={{}}>Don't have account yet?</Text>
            <Text style={{ color: Colors.primary }}>Sign Up </Text>
          </View> */}
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
    backgroundColor: "#fff"
    // alignItems: "center"
    // justifyContent: 'center',
  }
});
