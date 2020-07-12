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
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";

import Colors from "../constants/colors";
import style from "../constants/style";

import { CheckBox } from "@ui-kitten/components";

import { GlobalContext } from "../context/GlobalState";

import axios from "axios";

import serverUrl from "../constants/apiUrl";

export class SignUp extends Component {
  static contextType = GlobalContext;

  state = {
    emailIdChangeVariable: "",
    passChangeVariable: "",
    loadingSpinner: false,
    firstName: "",
    lastName: "",
    accessBool: false,
    firstNameError: false,
    lastNameError: false,
    emailIdError: false,
    passwordError: false,
    emailExistError: false,
  };
  onIdChange = (text) => {
    this.setState({ emailIdChangeVariable: text });
    console.log(this.state.emailIdChangeVariable);
  };
  onPassChange = (pass) => {
    this.setState({ passChangeVariable: pass });
    console.log(this.state.passChangeVariable);
  };
  firstNameChange = (text) => {
    this.setState({ firstName: text });
    console.log(this.state.firstName);
  };
  lastNameChange = (text) => {
    this.setState({ lastName: text });
    console.log(this.state.lastName);
  };
  onaccessBoolChange = (bool) => {
    this.setState((prevState) => ({
      accessBool: !prevState.accessBool,
    }));
  };

  handleSignUp = () => {
    let error = false;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.firstName.length) {
      this.setState({ firstNameError: "required" });
      error = true;
    } else if (this.state.firstName.length < 3) {
      this.setState({ firstNameError: "Minimum 3 character required" });
    } else {
      this.setState({ firstNameError: false });
    }

    if (!this.state.lastName.length) {
      this.setState({ lastNameError: required });
      error = true;
    } else if (this.state.lastName.length < 3) {
      this.setState({ lastNameError: "Minimum 3 character required" });
    } else {
      this.setState({ lastNameError: false });
    }

    if (!this.state.emailIdChangeVariable.length) {
      this.setState({ emailIdError: "Required" });
      error = true;
    } else if (reg.test(this.state.emailIdChangeVariable) == false) {
      this.setState({ emailIdError: "Enter valid Email" });
      error = true;
    } else {
      this.setState({ emailIdError: false });
    }

    if (!this.state.passChangeVariable.length) {
      this.setState({ passwordError: "Required" });
      error = true;
    } else if (this.state.passChangeVariable.length < 5) {
      this.setState({ passwordError: "Minimum 5 character required" });
      error = true;
    } else {
      this.setState({ passwordError: false });
    }
    if (error) {
      return;
    }
    this.setState({ loadingSpinner: true });
    this.setState({ emailExistError: false });
    axios
      .post(serverUrl + "/users", {
        email: this.state.emailIdChangeVariable,
        pass: this.state.passChangeVariable,
        fname: this.state.firstName,
        lname: this.state.lastName,
        access_right: this.state.accessBool ? "provider" : "user",
      })
      .then((response) => {
        console.log(response.data.access_right);
        if (response.data.access_right == "user") {
          this.context.setLoginInfo({...response.data,"jwt-token":response.headers.token});
          this.storeStateInLocalStorage({...response.data,"jwt-token":response.headers.token});
          this.props.Cprops.navigation.replace("UserHomeScreen");
        } else if (response.data.access_right == "provider") {
          this.context.setLoginInfo({...response.data,"jwt-token":response.headers.token});
          this.storeStateInLocalStorage({...response.data,"jwt-token":response.headers.token});
          this.props.Cprops.navigation.replace("ProviderHomeScreen");
        } else {
          this.setState({ loadingSpinner: false });
          ToastAndroid.show("Something went wrong, please try again", 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingSpinner: false });
        if (error.response && error.response.status === 400) {
          if (error.response.data == "Email-id already exists") {
            this.setState({ emailExistError: true });
          } else if (error.response.data == "Invalid Data") {
            ToastAndroid.show("Invalid Data", 2000);
          }
        } else {
          ToastAndroid.show("Something went wrong, please try again", 2000);
        }
      });
  };
  storeStateInLocalStorage = async (state) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(state));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <View
            style={[
              style.style.input,
              { width: "48%" },
              this.state.firstNameError
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
          >
            <TextInput
              maxLength={50}
              onChangeText={(text) => this.firstNameChange(text)}
              style={{
                width: "80%",
              }}
              placeholder="First Name"
            ></TextInput>
          </View>

          <View
            style={[
              style.style.input,
              { width: "48%" },
              this.state.lastNameError
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
          >
            <TextInput
              maxLength={50}
              onChangeText={(text) => this.lastNameChange(text)}
              style={{
                width: "80%",
              }}
              placeholder="Last Name"
            ></TextInput>
          </View>
        </View>
        {(this.state.lastNameError || this.state.firstNameError) && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {this.state.firstNameError || this.state.lastNameError}
          </Text>
        )}
        <View
          style={[
            style.style.input,
            this.state.emailIdError
              ? { borderColor: "red", borderWidth: 1 }
              : {},
          ]}
        >
          <TextInput
            maxLength={50}
            onChangeText={(text) => this.onIdChange(text)}
            style={{
              width: "85%",
              // ,fontSize:10
            }}
            placeholder="Email Id"
            require
          ></TextInput>
        </View>
        {this.state.emailIdError && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {this.state.emailIdError}
          </Text>
        )}
        <View
          style={[
            style.style.input,
            this.state.passwordError
              ? { borderColor: "red", borderWidth: 1 }
              : {},
          ]}
        >
          <TextInput
            maxLength={50}
            onChangeText={(pass) => this.onPassChange(pass)}
            style={{ width: "85%" }}
            placeholder="Password"
            secureTextEntry={true}
            required
          ></TextInput>
        </View>
        {this.state.passwordError && (
          <Text style={{ color: "red", fontSize: 13 }}>
            {this.state.passwordError}
          </Text>
        )}
        <View style={{ marginTop: 20 }}>
          <CheckBox
            text={`Create account as Parking Provider`}
            checked={this.state.accessBool}
            onPressIn={this.onaccessBoolChange}
          />
        </View>
        {this.state.emailExistError && (
          <Text
            style={{
              color: "red",
              fontSize: 13,
              marginTop: 10,
              marginBottom: -10,
            }}
          >
            This Email is already taken.Please try another
          </Text>
        )}

        {!this.state.loadingSpinner ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => {
              this.handleSignUp();
            }}
            style={{
              alignItems: "center",
              width: "100%",
              marginVertical: 20,
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
      </View>
    );
  }
}

export default SignUp;
