import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
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

import Colors from "../constants/colors";
import style from "../constants/style";

import { GlobalContext } from "../context/GlobalState";

import axios from "axios";

export class SignIn extends Component {
  state = {
    IdChangeVariable: String,
    onPassChangeVariable: String,
    loadingSpinner: false,
    userIdError: false,
    passwordError: false,
    // wrongIdPassError: false
    wrongIdPassError: false
  };
  onIdChange = text => {
    this.setState({ IdChangeVariable: text });
    console.log(this.state.IdChangeVariable);
  };
  onPassChange = pass => {
    this.setState({ onPassChangeVariable: pass });
    console.log(this.state.onPassChangeVariable);
  };
  componentDidMount() {}
  handleSignIn = context => {
    // this.props.Cprops.navigation.navigate("HomeScreen");
    // context.setLoginInfo({
    //   name: "fromloginScreen",
    //   loggedIn: true
    // });
    this.setState({ loadingSpinner: true });

    // console.log("here");
    // console.log( typeof this.state.IdChangeVariable == "function", typeof this.state.onPassChangeVariable)
    // this.props.navigation.navigate('FirstLogin')
    // if()
    if (
      typeof this.state.IdChangeVariable != "string" ||
      this.state.IdChangeVariable.length < 1
    ) {
      this.setState({ userIdError: true });
    } else {
      this.setState({ userIdError: false });
    }
    if (
      typeof this.state.onPassChangeVariable != "string" ||
      this.state.onPassChangeVariable.length < 1
    ) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }

    if (
      this.state.IdChangeVariable.length > 50 ||
      this.state.onPassChangeVariable.length > 50
    ) {
      Alert.alert("Enter valid Id and Password");
      this.setState({ loadingSpinner: false });
      return;
    }

    // this.setState({ loadingSpinner: false });
    // Alert.alert("Wrong Id or Password");

    // this.setState({ loadingSpinner: false });
    // Alert.alert("Try Again");

    axios
      .post("http://192.168.0.200:3000/users/login", {
        id: this.state.IdChangeVariable,
        pass: this.state.onPassChangeVariable
      })
      .then(response => {
        console.log(response);
        if (response.data.access_right == "user") {
          context.setLoginInfo(response.data);
          this.props.Cprops.navigation.navigate("HomeScreen");
        } else if (response.data.access_right == "provider") {
          context.setLoginInfo(response.data);
          this.props.Cprops.navigation.navigate("HomeScreen");
          
        } else {
          this.setState({ loadingSpinner: false });
          this.setState({ wrongIdPassError: true });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ loadingSpinner: false });
        this.setState({ wrongIdPassError: true });
      });
  };
  render() {
    return (
      <GlobalContext.Consumer>
        {context => (
          <View
            style={{
              alignItems: "center",
              marginTop: 20
            }}
          >
            <View
              style={[
                style.style.input,
                this.state.userIdError
                  ? { borderColor: "red", borderWidth: 1 }
                  : {}
              ]}
            >
              <TextInput
                maxLength={50}
                onChangeText={text => this.onIdChange(text)}
                style={{
                  width: "85%"
                  // ,fontSize:10
                }}
                placeholder="User Id"
                require
              ></TextInput>
            </View>
            {this.state.userIdError && (
              <Text style={{ color: "red", fontSize: 13 }}>Required</Text>
            )}
            <View
              style={[
                style.style.input,
                this.state.passwordError
                  ? { borderColor: "red", borderWidth: 1 }
                  : {}
              ]}
            >
              <TextInput
                maxLength={50}
                onChangeText={pass => this.onPassChange(pass)}
                style={{ width: "85%" }}
                placeholder="Password"
                required
              ></TextInput>
            </View>
            {this.state.passwordError && (
              <Text style={{ color: "red", fontSize: 13 }}>Required</Text>
            )}
            {this.state.wrongIdPassError && (
              // <Text
              //   style={{
              //     color: "red",
              //     fontSize: 13,
              //     marginTop: 8,
              //     marginBottom: -25
              //   }}
              // >
              //   Wrong Id or Password!
              // </Text>
              <Text
                style={{
                  color: "red",
                  fontSize: 13,
                  marginTop: 13,
                  marginBottom: -15
                }}
              >
                Wrong User Id or Password!
              </Text>
            )}

            {!this.state.loadingSpinner ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.handleSignIn(context);
                  // context.setLoginInfo({
                  //   name: "fromloginScreen",
                  //   loggedIn: true
                  // });
                }}
                style={{
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 30
                }}
              >
                <View style={style.style.button}>
                  <Text style={{ color: "white" }}>Sign In</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator
                style={{ height: 50, marginVertical: 30 }}
                size="large"
                color={Colors.primary}
              />
            )}
          </View>
        )}
      </GlobalContext.Consumer>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
  input: {
    width: "80%",
    alignItems: "flex-end",
    borderWidth: 0.1,
    borderColor: Colors.primary,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
    // backgroundColor:"#e8e8e8"
  }
});
