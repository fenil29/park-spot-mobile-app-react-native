import React, { Component } from "react";

import {
  StyleSheet,
  //  Text,
  View,
  BackHandler,
  SafeAreaView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
  TextInput,
  Picker,
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

import { GlobalContext } from "../context/GlobalState";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";
import style from "../constants/style";

export class MyProfile extends Component {
  static contextType = GlobalContext;
  state = {
    editMode: false,
    access_right: this.context.state.loginData.access_right,
    user_email_id: this.context.state.loginData.user_email_id,
    user_first_name: this.context.state.loginData.user_first_name,
    user_last_name: this.context.state.loginData.user_last_name,
  };
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;
  EditIcon = (style) => <Icon {...style} name="edit-2-outline" />;
  componentDidMount = () => {
    console.log(this.context.state.loginData);
  };
  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  EditAction = () => (
    <TopNavigationAction
      icon={this.EditIcon}
      // onPressIn={() =>
      //   this.setState((prevState) => ({
      //     editMode: !prevState.editMode,
      //   }))
      // }
    />
  );
  onFirstNameChange = (text) => {
    this.setState({ user_first_name: text });
  };
  onLastNameChange = (text) => {
    this.setState({ user_last_name: text });
  };
  onEmailChange = (text) => {
    this.setState({ user_email_id: text });
  };
  onAccessValueChange = (acc) => {
    this.setState({ access_right: acc });
  };
  render() {
    return (
      <GlobalContext.Consumer>
        {(context) => {
          let firstName = context.state.loginData.user_first_name;
          let lastName = context.state.loginData.user_last_name;
          return (
            <Layout style={styles.container}>
              <TopNavigation
                title="Account"
                alignment="center"
                leftControl={this.BackAction()}
                rightControls={this.EditAction()}
              />
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 25, marginTop: 5, lineHeight: 25 }}>
                  {firstName + " " + lastName}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: "85%",
                  }}
                >
                  <Text style={{ color: "gray", marginTop: 5, fontSize: 14 }}>
                    {" "}
                    FIRST NAME
                  </Text>
                  <View
                    style={{
                      ...style.style.input,
                      marginTop: 5,
                      width: "100%",
                    }}
                  >
                    <TextInput
                      onChangeText={(text) => this.onFirstNameChange(text)}
                      defaultValue={this.state.user_first_name}
                      editable={this.state.editMode}
                      selectionColor="#ffffff"
                      maxLength={50}
                      style={{
                        width: "85%",
                        color: this.state.editMode ? "black" : "gray",
                      }}
                      placeholder="first name"
                      require
                    ></TextInput>
                  </View>
                  <Text style={{ color: "gray", marginTop: 10, fontSize: 14 }}>
                    {" "}
                    LAST NAME
                  </Text>
                  <View
                    style={{
                      ...style.style.input,
                      marginTop: 5,
                      width: "100%",
                    }}
                  >
                    <TextInput
                      onChangeText={(text) => this.onLastNameChange(text)}
                      defaultValue={this.state.user_last_name}
                      editable={this.state.editMode}
                      selectionColor="#ffffff"
                      maxLength={50}
                      style={{
                        width: "85%",
                        color: this.state.editMode ? "black" : "gray",
                      }}
                      placeholder="last name"
                      require
                    ></TextInput>
                  </View>
                  <Text style={{ color: "gray", marginTop: 10, fontSize: 14 }}>
                    {" "}
                    EMAIL
                  </Text>
                  <View
                    style={{
                      ...style.style.input,
                      marginTop: 5,
                      width: "100%",
                    }}
                  >
                    <TextInput
                      onChangeText={(text) => this.onEmailChange(text)}
                      defaultValue={this.state.user_email_id}
                      editable={this.state.editMode}
                      selectionColor="#ffffff"
                      maxLength={50}
                      style={{
                        width: "85%",
                        color: this.state.editMode ? "black" : "gray",
                      }}
                      placeholder="Email Id"
                      require
                    ></TextInput>
                  </View>
                  <Text style={{ color: "gray", marginTop: 10, fontSize: 14 }}>
                    {" "}
                    ACCOUNT TYPE
                  </Text>
                  <View
                    style={{
                      ...style.style.input,
                      marginTop: 5,
                      width: "100%",
                    }}
                  >
                    <Picker
                      selectedValue={this.state.access_right}
                      enabled={this.state.editMode}
                      style={{
                        color: this.state.editMode ? "black" : "gray",
                        height: 30,
                        width: "100%",
                        // backgroundColor:"red"
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.onAccessValueChange(itemValue)
                      }
                    >
                      <Picker.Item label="user" value="user" />
                      <Picker.Item label="provider" value="provider" />
                    </Picker>
                  </View>
                  {this.state.editMode && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        console.log("Done");
                        // this.props.onSelectMapClose();
                      }}
                      style={{
                        alignItems: "center",
                        width: "100%",
                        marginVertical: 20,
                      }}
                    >
                      <View style={style.style.button}>
                        <Text style={{ color: "white" }}>Done</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {/* <Text>{JSON.stringify(context)}</Text> */}
            </Layout>
          );
        }}
      </GlobalContext.Consumer>
    );
  }
}

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
