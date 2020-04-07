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
} from "react-native";

import Colors from "../constants/colors";
import style from "../constants/style";

import { CheckBox } from "@ui-kitten/components";

export class SignUp extends Component {
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
  };
  // firstTimeForLoginDataRetrieval=true;

  // emailIdChangeVariable = "";
  // passChangeVariable = "";
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
    // console.log(bool)
    this.setState((prevState) => ({
      accessBool: !prevState.accessBool,
    }));
  };

  handleSignUp = () => {
    let error=false
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.firstName.length) {
      this.setState({ firstNameError: true });
      error=true
    } else {
      this.setState({ firstNameError: false });
    }

    if (!this.state.lastName.length) {
      this.setState({ lastNameError: true });
      error=true
    } else {
      this.setState({ lastNameError: false });
    }

    if (!this.state.emailIdChangeVariable.length) {
      this.setState({ emailIdError: "Required" });
      error=true
    } else if (reg.test(this.state.emailIdChangeVariable) == false) {
      this.setState({ emailIdError: "Enter valid Email" });
      error=true
    } else {
      this.setState({ emailIdError: false });
    }

    if (!this.state.passChangeVariable.length) {
      this.setState({ passwordError: "Required" });
      error=true
    } else if (this.state.passChangeVariable.length < 5) {
      this.setState({ passwordError: "Minimum 5 character required" });
      error=true
    } else {
      this.setState({ passwordError: false });
    }
    if (error) {
      return;
    }
    this.setState({ loadingSpinner: true });
    axios
      .post( serverUrl + "/users", {
        email: this.state.emailIdChangeVariable,
        pass: this.state.passChangeVariable,
        fname: this.state.firstName,
        lname: this.state.lastName,
        access_right: this.state.accessBool ? "provider" : "user",
      })
      .then(response => {
        console.log(response);
        if (response.data.access_right == "user") {
          this.context.setLoginInfo(response.data);
          this.storeStateInLocalStorage(response.data);
          this.props.Cprops.navigation.replace("UserHomeScreen");
        } else if (response.data.access_right == "provider") {
          this.context.setLoginInfo(response.data);
          this.storeStateInLocalStorage(response.data);
          this.props.Cprops.navigation.replace("ProviderHomeScreen");
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
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            //   backgroundColor: "#666",
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
                : {},
            ]}
          >
            <TextInput
              maxLength={50}
              onChangeText={(text) => this.lastNameChange(text)}
              style={{
                width: "80%",
                //  backgroundColor: "#222"
              }}
              placeholder="Last Name"
            ></TextInput>
          </View>
        </View>
        {(this.state.lastNameError || this.state.firstNameError) && (
          <Text style={{ color: "red", fontSize: 13 }}>Required</Text>
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

        {/* <Text style={{ color: "red", fontSize: 13,marginTop:13 }}>Wrong User Id or Password</Text> */}

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
