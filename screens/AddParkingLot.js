import React, { Component } from "react";

import {
  StyleSheet,
  //  Text,
  TextInput,
  View,
  BackHandler,
  SafeAreaView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";
import style from "../constants/style";

import SelectLocationMaps from "./SelectLocationMaps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export class AddParkingLot extends Component {
  state = {
    selectLocationMapsModel: false,
    location: false,
    errorMessage: null,
    parkingLotName: String,
    parkingLotAddress: String,
    parkingLotPinCode: String,
    parkingLotCity: String,
    parkingLotState: String,
    loadingSpinner: false
  };
  BackIcon = style => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  onLocationChange = e => {
    this.setState({ location: { coords: e } });
  };
  onSelectMapClose = () => {
    this.setState({ selectLocationMapsModel: false });
  };
  onChange = (name, e) => {
    let text = e.nativeEvent.text;
    this.setState({ [name]: text });
  };
  handleSelectLocation = () => {
    this.setState({ selectLocationMapsModel: true });
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: false
      });
    }
    if (status == "granted") {
      this.setState({
        errorMessage: true
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // this.setState({ location });
    this.setState({
      location: { coords: { latitude: 22.599936, longitude: 72.8205 } }
    });
  };

  render() {
    if (this.state.errorMessage === null) {
      return <Text>Requesting for Location permission</Text>;
    }
    if (this.state.errorMessage === false) {
      return <Text>Allow Location Permission to Use This Feature</Text>;
    }

    return (
      <Layout style={styles.container}>
        {this.state.selectLocationMapsModel &&
        this.state.errorMessage &&
        this.state.location ? (
          <SelectLocationMaps
            selectLocationMapsModel={this.state.selectLocationMapsModel}
            onSelectMapClose={this.onSelectMapClose}
            location={this.state.location}
            onLocationChange={this.onLocationChange}
          />
        ) : (
          <View />
        )}

        <TopNavigation
          title="Add Parking Lot"
          alignment="center"
          leftControl={this.BackAction()}
        />

        <View
          style={{
            alignItems: "center",
            marginTop: 10
          }}
        >
          <View style={style.style.input}>
            <TextInput
              maxLength={50}
              onChange={text => this.onChange("parkingLotName", text)}
              style={{
                width: "85%"
                // ,fontSize:10
              }}
              placeholder="Parking Lot Name"
              require
            ></TextInput>
          </View>
          <View style={style.style.input}>
            <TextInput
              maxLength={200}
              onChange={text => this.onChange("parkingLotAddress", text)}
              style={{
                width: "85%"
                // ,fontSize:10
              }}
              placeholder="Parking Lot Address"
              require
            ></TextInput>
          </View>
          <View style={style.style.input}>
            <TextInput
              keyboardType="numeric"
              maxLength={20}
              onChange={text => this.onChange("parkingLotPinCode", text)}
              style={{
                width: "85%"
                // ,fontSize:10
              }}
              placeholder="Parking Lot Pin Code"
              require
            ></TextInput>
          </View>
          <View style={style.style.input}>
            <TextInput
              maxLength={20}
              onChange={text => this.onChange("parkingLotCity", text)}
              style={{
                width: "85%"
                // ,fontSize:10
              }}
              placeholder="Parking Lot City"
              require
            ></TextInput>
          </View>
          <View style={style.style.input}>
            <TextInput
              maxLength={20}
              onChange={text => this.onChange("parkingLotState", text)}
              style={{
                width: "85%"
                // ,fontSize:10
              }}
              placeholder="Parking Lot State"
              require
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              //   backgroundColor: "#666",
              justifyContent: "center",
              width: "80%",
              // backgroundColor:"red",
              padding: 0,
              marginBottom: 0
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.handleSelectLocation();
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginVertical: 20,
                borderWidth: 0.1,
                borderColor: Colors.primary,
                padding: 10,
                //   marginTop: 20,
                marginBottom: 0,
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
              }}
            >
              <View>
                <Text style={{ color: "black", fontSize: 13 }}>
                  Select Location
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <SelectLocationMaps/> */}

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
              <View style={style.style.button}>
                <Text style={{ color: "white" }}>Add</Text>
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
      </Layout>
    );
  }
}

export default AddParkingLot;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Platform.OS === "android" ? 24 : 0
  }
});
