import React from "react";
import MapView from "react-native-maps";

import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";

import { MaterialIcons, Foundation } from "@expo/vector-icons";

import style from "../constants/style";

import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class SelectLocationMaps extends React.Component {
  state = {
    errorMessage: false,
    location: false,
    loading: true,
    getUserLocationLoading: false,
    tooltipVisible: true,
  };

  componentDidMount() {
    console.log(this.state.location);
    if (this.props.location) {
      this.setState({
        location: this.props.location,
        loading: false,
        errorMessage: false,
      });
    } else {
      this._getLocationAsync();
    }
    setTimeout(() => {
      this.setState({ tooltipVisible: false });
    }, 4000);
  }
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.onSelectMapClose()}
    />
  );
  onLocationChange = (e) => {
    this.setState({ location: { coords: e } });
  };
  onSelectMapClose = () => {
    this.props.onSelectMapClose(
      this.state.location ? this.state.location : false
    );
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: true,
      });
    }
    if (status == "granted") {
      this.setState({
        errorMessage: false,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // this.setState({ location });
    this.setState({
      // location: { coords: { latitude: 22.599936, longitude: 72.8205 } },
      location: location,
      loading: false,
    });
  };
  getUserLocation = async () => {
    this.setState({ getUserLocationLoading: true });

    try {
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      this.setState({
        // location: { coords: { latitude: 32.715069, longitude: -117.15552 } },
        location: location,
      });
      this.setState({ getUserLocationLoading: false });
    } catch (e) {
      console.log(e);
      this.setState({ getUserLocationLoading: false });
    }
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.selectLocationMapsModel}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          this.onSelectMapClose();
        }}
      >
        <View style={styles.container}>
          <TopNavigation
            title="Select Parking Lot Location"
            alignment="center"
            leftControl={this.BackAction()}
          />
          {this.state.tooltipVisible && (
            <View
              style={{
                // height: 40,
                // width: "100%",
                borderWidth: 1,
                // padding: 5,
                borderRadius: 8,
                backgroundColor: "#ffffff",
                position: "absolute",
                left: 10,
                right: 10,
                top: 70,
                zIndex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                // marginHorizontal: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Foundation
                name="info"
                size={24}
                color="black"
                style={{ margin: 10 }}
              />
              <Text>
                You can select the location by holding and dragging the marker
              </Text>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.getUserLocation();
            }}
            style={{
              height: 40,
              width: 40,
              borderWidth: 1,
              // padding: 5,
              borderRadius: 8,
              backgroundColor: "#ffffffbb",
              position: "absolute",
              right: 15,
              bottom: 25,
              zIndex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!this.state.getUserLocationLoading ? (
              <MaterialIcons name="my-location" size={30} />
            ) : (
              <Spinner color="blue" />
            )}
          </TouchableOpacity>
          {this.state.errorMessage ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Text>Allow Location Permission to Use This Feature</Text>
            </View>
          ) : this.state.loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Spinner color="blue" />
            </View>
          ) : (
            <>
              <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude: this.state.location.coords.latitude,
                  longitude: this.state.location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <MapView.Marker
                  draggable
                  coordinate={this.state.location.coords}
                  onDragEnd={(e) => {
                    //   this.setState({ currentLocation: e.nativeEvent.coordinate },()=>{console.log(this.state.currentLocation)})
                    this.onLocationChange(e.nativeEvent.coordinate);
                  }}
                />
              </MapView>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  console.log("Done");
                  this.onSelectMapClose();
                }}
                style={{
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 20,
                  position: "absolute",
                  bottom: 0,
                }}
              >
                <View style={style.style.button}>
                  <Text style={{ color: "white" }}>Done</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  mapStyle: {
    // position: "relative",
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    width: "100%",
    height: "100%",
  },
});
