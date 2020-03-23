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

import { CheckBox } from "@ui-kitten/components";

export class SignUp extends Component {
  state = {
    IdChangeVariable: String,
    onPassChangeVariable: String,
    loadingSpinner: false,
    firstName: "",
    lastName: "",
    Checked: false,
    firstNameError: false,
    lastNameError: false,
    userIdError: false,
    passwordError: false
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
  onCheckedChange = bool => {
    // console.log(bool)
    this.setState(prevState => ({
      Checked: !prevState.Checked
    }));
  };

  handleSignUp = () => {
    this.props.Cprops.navigation.navigate("HomeScreen");
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
          <View
            style={[
              style.style.input,
              { width: "48%" },
              this.state.firstNameError
                ? { borderColor: "red", borderWidth: 1 }
                : {}
            ]}
          >
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
            style={[
              style.style.input,
              { width: "48%" },
              this.state.lastNameError
                ? { borderColor: "red", borderWidth: 1 }
                : {}
            ]}
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
          {(this.state.lastNameError ||  this.state.firstNameError )&& (
            <Text style={{ color: "red", fontSize: 13 }}>Required</Text>
          )}
        <View
          style={[
            style.style.input,
            this.state.userIdError ? { borderColor: "red", borderWidth: 1 } : {}
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
            this.state.passwordError ? { borderColor: "red", borderWidth: 1 } : {}
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
        <View style={{ marginTop: 20 }}>
          <CheckBox
            text={`Create account as Parking Provider`}
            checked={this.state.Checked}
            onPressIn={this.onCheckedChange}
          />
        </View>

        {/* <Text style={{ color: "red", fontSize: 13,marginTop:13 }}>Wrong User Id or Password</Text> */}

        {!this.state.loadingSpinner ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.handleSignUp();
            }}
            style={{
              alignItems: "center",
              width: "100%",
              marginVertical: 20
            }}
          >
            <View style={style.style.button}>
              <Text style={{ color: "white" }}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            style={{ height: 50, marginVertical: 20 }}
            size="large"
            color={Colors.primary}
          />
        )}
        {/* <View>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Text style={{ textDecorationLine: "underline" }}>
              Create account as Parking Provider
            </Text>
          </TouchableWithoutFeedback>
        </View> */}
      </View>
    );
  }
}

export default SignUp;
