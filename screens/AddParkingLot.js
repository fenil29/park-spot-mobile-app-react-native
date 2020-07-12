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
  StatusBar,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";
import style from "../constants/style";

import SelectLocationMaps from "./SelectLocationMaps";

import axios from "axios";

import serverUrl from "../constants/apiUrl";

import { GlobalContext } from "../context/GlobalState";

export class AddParkingLot extends Component {
  static contextType = GlobalContext;

  state = {
    selectLocationMapsModel: false,
    location: false,
    parkingLotName: "",
    parkingLotNameError: false,
    parkingLotAddress: "",
    parkingLotAddressError: false,
    parkingLotPinCode: "",
    parkingLotPinCodeError: false,
    hourlyRate: 0,
    totalSpot: "",
    partotalSpotError: false,
    loadingSpinner: false,
  };
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );

  handleSignIn = () => {
    let error = false;
    if (this.state.parkingLotName.length == 0) {
      this.setState({ parkingLotNameError: "required" });
      error = true;
    } else if (this.state.parkingLotName.length < 3) {
      this.setState({ parkingLotNameError: "Minimum 3 character required" });
      error = true;
    } else {
      this.setState({ parkingLotNameError: false });
    }
    if (this.state.parkingLotAddress.length == 0) {
      this.setState({ parkingLotAddressError: true });
      error = true;
    } else {
      this.setState({ parkingLotAddressError: false });
    }
    if (this.state.parkingLotPinCode.length == 0) {
      this.setState({ parkingLotPinCodeError: true });
      error = true;
    } else {
      this.setState({ parkingLotPinCodeError: false });
    }
    if (this.state.totalSpot.length == 0) {
      this.setState({ partotalSpotError: true });
      error = true;
    } else {
      this.setState({ partotalSpotError: false });
    }
    if (this.state.location === false) {
      ToastAndroid.show("Please Select Location First", 2000);

      error = true;
    }
    if (error) {
      return;
    }
    this.setState({ loadingSpinner: true });

    axios
      .post(
        serverUrl + "/parking" + this.context.state.loginData.user_user_id,
        {
          name: this.state.parkingLotName,
          address: this.state.parkingLotAddress,
          pin: this.state.parkingLotPinCode,
          longitude: String(this.state.location.coords.longitude),
          latitude: String(this.state.location.coords.latitude),
          price: this.state.hourlyRate,
          total: this.state.totalSpot,
        },
        {
          headers: {
            "jwt-token": this.context.state.loginData["jwt-token"],
          },
        }
      )
      .then((response) => {
        this.setState({ loadingSpinner: false });

        ToastAndroid.show("Parking Lot Created Successfully", 2000);
      })
      .catch((error) => {
        this.setState({ loadingSpinner: false });
        console.log(error);
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data == "Invalid Data"
        ) {
          ToastAndroid.show("Invalid Data", 2000);
        } else {
          ToastAndroid.show("Something went wrong, please try again", 2000);
        }
      });
  };

  onSelectMapClose = (loc) => {
    this.setState({ selectLocationMapsModel: false });
    this.setState({ location: loc });
  };
  onChange = (name, e) => {
    let text = e.nativeEvent.text;
    this.setState({ [name]: text });
  };
  handleSelectLocation = () => {
    this.setState({ selectLocationMapsModel: true });
  };

  render() {
    return (
      <Layout style={styles.container}>
        {this.state.selectLocationMapsModel && (
          <SelectLocationMaps
            location={this.state.location}
            selectLocationMapsModel={this.state.selectLocationMapsModel}
            onSelectMapClose={this.onSelectMapClose}
          />
        )}
        <TopNavigation
          title="Add Parking Lot"
          alignment="center"
          leftControl={this.BackAction()}
        />

        <View
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={[
              style.style.input,
              this.state.parkingLotNameError
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
          >
            <TextInput
              maxLength={50}
              onChange={(text) => this.onChange("parkingLotName", text)}
              style={{
                width: "85%",
                // borderColor:"red",
                // borderWidth:10
                // ,fontSize:10
              }}
              placeholder="Parking Lot Name"
              require
            ></TextInput>
          </View>
          {this.state.parkingLotNameError && (
            <Text style={{ color: "red", fontSize: 13 }}>
              {this.state.parkingLotNameError}
            </Text>
          )}
          <View
            style={[
              style.style.input,
              this.state.parkingLotAddressError
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
          >
            <TextInput
              maxLength={200}
              onChange={(text) => this.onChange("parkingLotAddress", text)}
              style={{
                width: "85%",
                // ,fontSize:10
              }}
              placeholder="Parking Lot Address"
              require
            ></TextInput>
          </View>
          {this.state.parkingLotAddressError && (
            <Text style={{ color: "red", fontSize: 13 }}>Required</Text>
          )}
          <View
            style={[
              style.style.input,
              this.state.parkingLotPinCodeError
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
          >
            <TextInput
              keyboardType="numeric"
              maxLength={20}
              onChange={(text) => this.onChange("parkingLotPinCode", text)}
              style={{
                width: "85%",
                // ,fontSize:10
              }}
              placeholder="Parking Lot Pin Code"
            ></TextInput>
          </View>
          {this.state.parkingLotPinCodeError && (
            <Text style={{ color: "red", fontSize: 13 }}>Required</Text>
          )}

          <View style={style.style.input}>
            <TextInput
              keyboardType="number-pad"
              maxLength={20}
              onChange={(text) => this.onChange("hourlyRate", text)}
              style={{
                width: "85%",
                // ,fontSize:10
              }}
              placeholder="Hourly Rate"
              require
            ></TextInput>
          </View>
          <View
            style={[
              style.style.input,
              this.state.partotalSpotError
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
          >
            <TextInput
              keyboardType="number-pad"
              maxLength={20}
              onChange={(text) => this.onChange("totalSpot", text)}
              style={{
                width: "85%",
                // ,fontSize:10
              }}
              placeholder="Total Spot"
              require
            ></TextInput>
          </View>
          {this.state.partotalSpotError && (
            <Text style={{ color: "red", fontSize: 13 }}>Required</Text>
          )}

          <View
            style={{
              flexDirection: "row",
              //   backgroundColor: "#666",
              justifyContent: "center",
              width: "80%",
              // backgroundColor:"red",
              padding: 0,
              marginBottom: 0,
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
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
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
                marginVertical: 30,
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
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
