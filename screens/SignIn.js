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


export class SignIn extends Component {
  state = {
    IdChangeVariable: String,
    onPassChangeVariable: String,
    loadingSpinner: false
  };
  // firstTimeForLoginDataRetrieval=true;

  // IdChangeVariable = "";
  // onPassChangeVariable = "";
  onIdChange = text => {
    this.setState({ IdChangeVariable: text });
    console.log(this.state.IdChangeVariable);
  };
  onPassChange = pass => {
    this.setState({ onPassChangeVariable: pass });
    console.log(this.state.onPassChangeVariable);
  };

  handleSignIn = () => {
    this.props.Cprops.navigation.navigate("HomeScreen");

    return;
    this.setState({ loadingSpinner: true });
    // console.log("here");
    // console.log( typeof this.state.IdChangeVariable == "function", typeof this.state.onPassChangeVariable)
    // this.props.navigation.navigate('FirstLogin')
    // if()
    if (
      typeof this.state.IdChangeVariable != "string" ||
      typeof this.state.onPassChangeVariable != "string" ||
      this.state.IdChangeVariable.length < 1 ||
      this.state.onPassChangeVariable.length < 1 ||
      this.state.IdChangeVariable.length > 50 ||
      this.state.onPassChangeVariable.length > 50
    ) {
      Alert.alert("Enter valid Id and Password");
      this.setState({ loadingSpinner: false });
      return;
    }
    fetch("example.com", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: this.state.IdChangeVariable,
        password: this.state.onPassChangeVariable
      })
    })
      .then(response => {
        console.log(response.status); // Will show you the status
        if (response.status != 200) {
          this.setState({ loadingSpinner: false });
          Alert.alert("Wrong Id or Password");
        }
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson);
        tempResponse = responseJson;
        // response 0 -> user is logging in first time
        // response 1 -> user logged in before
        if (!tempResponse.Authentication) {
          this.setState({ loadingSpinner: false });
          Alert.alert("Wrong Id or Password");
          return;
        }
        if (tempResponse.Status == 0) {
          this.props.navigation.replace("FirstLogin");
        }
        if (tempResponse.Status == 1) {
        }
        // return responseJson.movies;
        console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
        this.setState({ loadingSpinner: false });
        Alert.alert("Try Again");
      });
  };
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: 20
        }}
      >
        <View
            style={style.style.input}
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
        <View
         style={style.style.input}
        >
          <TextInput
            maxLength={50}
            onChangeText={pass => this.onPassChange(pass)}
            style={{ width: "85%" }}
            placeholder="Password"
            required
          ></TextInput>
        </View>
        {!this.state.loadingSpinner ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.handleSignIn();
            }}
            style={{
              alignItems: "center",
              width: "100%",
              marginVertical: 30
            }}
          >
            <View
              style={style.style.button}
            >
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

