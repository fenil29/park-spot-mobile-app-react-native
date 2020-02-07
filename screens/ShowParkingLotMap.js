import React, { Component } from "react";

import MapView from "react-native-maps";

import {
  Dimensions,
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
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Spinner
} from "native-base";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";
import style from "../constants/style";

import SelectLocationMaps from "./SelectLocationMaps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class ShowParkingLotMap extends React.Component {
  state = {
    selectLocationMapsModel: false,
    location: false,
    errorMessage: null,
    parkingLotList: {},
    isLoading: true,
    permission: false
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        responseJson = [ { pd_loc_cood: "22.599936,72.8205" }];
        if (responseJson.length == 0) {
          throw new Error("empty");
        }
        if (!responseJson[0].pd_loc_cood) {
          throw new Error("Invalid Data");
        }
        this.setState(
          {
            parkingLotList: responseJson,
            isLoading: false
          },
          function() {}
        );
      })
      .catch(error => {
        // console.error(error);
        console.log(error.message);
        this.setState({
          errorMessage: error.message,
          isLoading: false
        });
      });
  }
  componentWillMount() {
    this._getLocationAsync();
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        permission: false
      });
    }
    if (status == "granted") {
      this.setState({
        permission: true
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // this.setState({ location });
    this.setState({
      location: { coords: { latitude: 22.599936, longitude: 72.8205 } }
    });
  };
  render() {
    //   <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100%"
    //   }}
    // >
    //   <Spinner color="blue" />
    // <Text>Allow Location Permission to Use This Feature</Text>
    // </View>

    if (!this.state.permission || !this.state.location) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          <Text>Allow Location Permission to Use This Feature</Text>
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          <Spinner color="blue" />
        </View>
      );
    } else if (this.state.errorMessage == "empty") {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          ></MapView>
        </View>
      );
    } else if (this.state.errorMessage) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          <Text>{this.state.errorMessage}</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.state.parkingLotList.map(mapInfo => (
            <MapView.Marker
              coordinate={{
                latitude: Number(mapInfo.pd_loc_cood.split(",")[0]),
                longitude: Number(mapInfo.pd_loc_cood.split(",")[1])
              }}
              title={mapInfo.pd_loc_name}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
