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
} from "@ui-kitten/components";

import style from "../constants/style";

export default class SelectLocationMaps extends React.Component {
  state = {};
  componentDidMount() {
    console.log(this.props.location);
  }

  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.onSelectMapClose()}
    />
  );
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.selectLocationMapsModel}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          this.props.onSelectMapClose();
        }}
      >
        <View style={styles.container}>
          <TopNavigation
            title="Select Parking Lot Location"
            alignment="center"
            leftControl={this.BackAction()}
          />

          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: this.props.location.coords.latitude,
              longitude: this.props.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              draggable
              coordinate={this.props.location.coords}
              onDragEnd={(e) => {
                //   this.setState({ currentLocation: e.nativeEvent.coordinate },()=>{console.log(this.state.currentLocation)})
                this.props.onLocationChange(e.nativeEvent.coordinate);
              }}
            />
          </MapView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              console.log("Done");
              this.props.onSelectMapClose();
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
