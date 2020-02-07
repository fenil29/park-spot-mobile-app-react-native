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

export class SignUp extends Component {
  state = {
    IdChangeVariable: String,
    onPassChangeVariable: String,
    loadingSpinner: false,
    firstName: "",
    lastName: ""
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
  firstNameChange = text => {
    this.setState({ firstName: text });
    console.log(this.state.firstName);
  };
  lastNameChange = text => {
    this.setState({ lastName: text });
    console.log(this.state.lastName);
  };

  handleSignUp = () => {
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
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            //   backgroundColor: "#666",
            justifyContent: "space-between",
            width: "80%"
          }}
        >
          <View style={[style.style.input, { width: "48%" }]}>
            <TextInput
              maxLength={50}
              onChangeText={text => this.firstNameChange(text)}
              style={{
                width: "80%"
                //  backgroundColor: "#222"
              }}
              placeholder="First Name"
            ></TextInput>
          </View>
          <View
            // style={...style.style.input,{width:"50%"}}
            style={[style.style.input, { width: "48%" }]}
          >
            <TextInput
              maxLength={50}
              onChangeText={text => this.lastNameChange(text)}
              style={{
                width: "80%"
                //  backgroundColor: "#222"
              }}
              placeholder="Last Name"
            ></TextInput>
          </View>
        </View>
        <View style={style.style.input}>
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
        <View style={style.style.input}>
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
              this.handleSignUp();
            }}
            style={{
              alignItems: "center",
              width: "100%",
              marginVertical: 30
            }}
          >
            <View style={style.style.button}>
              <Text style={{ color: "white" }}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            style={{ height: 50, marginVertical: 30 }}
            size="large"
            color={Colors.primary}
          />
        )}
        <View>
          <TouchableWithoutFeedback onPress={() => {}}>
            {/* <Text></Text> */}
            <Text style={{ textDecorationLine: "underline" }}>
              Create account as Parking Provider
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default SignUp;
