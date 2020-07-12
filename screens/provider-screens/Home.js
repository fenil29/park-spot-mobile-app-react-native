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
  TouchableWithoutFeedback,
} from "react-native";

import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import Colors from "../../constants/colors";

import ScanQrCodeCard from "../../components/ScanQrCodeCard";
import ParkingSpotsCard from "../../components/ParkingLotsCard";
import AddParkingLotCard from "../../components/AddParkingLotCard";
import MyParkingLotCard from "../../components/MyParkingLotCard";

import { Ionicons, Foundation } from "@expo/vector-icons";

export class Home extends Component {
  BackIcon = (style) => <Icon {...style} name="menu-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.toggleDrawer()}
    />
  );

  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          alignment="center"
          leftControl={this.BackAction()}
        />

        <View
          style={{
            flexDirection: "row",
            // backgroundColor:"blue",
            justifyContent: "space-between",
            marginHorizontal: 20,
            // marginTop: 30,
            flexWrap: "wrap",
            // height:"10"
          }}
        >
          <ScanQrCodeCard
            onClick={() => this.props.navigation.navigate("QRCode")}
          />
          <ParkingSpotsCard
            onClick={() => this.props.navigation.navigate("ShowParkingLotMap")}
          />
          <AddParkingLotCard
            onClick={() => this.props.navigation.navigate("AddParkingLot")}
          />
          <MyParkingLotCard
            onClick={() => this.props.navigation.navigate("MyParkingLot")}
          />
          {/* <View>
              <Foundation name="map" size={32} color="black" />
            </View> */}
        </View>
      </Layout>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
