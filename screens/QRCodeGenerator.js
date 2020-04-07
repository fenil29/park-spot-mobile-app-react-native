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
  ScrollView,
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import QRCode from "react-native-qrcode-svg";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";

export class QRCodeGenerator extends Component {
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  render() {
    const fill = "rgb(134, 65, 244)";
    let parkingLotDataEntry = {
      id: this.props.navigation.state.params.data.pd_lot_id,
      type: "find-my-spot-qr-code",
      access: "entry",
    };
    let parkingLotDataExit = {
      id: this.props.navigation.state.params.data.pd_lot_id,
      type: "find-my-spot-qr-code",
      access: "exit",
    };

    let lotInfo = this.props.navigation.state.params.data;
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="Parking Lot QR Code"
          alignment="center"
          leftControl={this.BackAction()}
        />
        <ScrollView>
          {/* <Text>{JSON.stringify(lotInfo)}</Text> */}
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              borderWidth: 0.1,
              borderColor: "black",
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}
          >
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#d9d9d9",
                paddingBottom: 10,
              }}
            >
              Parking Lot Details
            </Text>
            <Text style={{ paddingTop: 10 }}>Name : {lotInfo.pd_loc_name}</Text>
            <Text>Address : {lotInfo.pd_loc_address}</Text>
            <Text>Total Spot : {lotInfo.total_spot}</Text>
            <Text>Occupied Spot : {lotInfo.occupied_spot}</Text>
            <Text>Hourly Rate : {lotInfo.pd_hrly_rate}</Text>
          </View>

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              borderWidth: 0.1,
              borderColor: "black",
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#d9d9d9",
                paddingBottom: 10,
                marginBottom: 20,
                width: "100%",
              }}
            >
              Parking Lot Entry QR Code
            </Text>
            <QRCode value={JSON.stringify(parkingLotDataEntry)} size={200} />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              borderWidth: 0.1,
              borderColor: "black",
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
              alignItems: "center",
              marginBottom:10
            }}
          >
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#d9d9d9",
                paddingBottom: 10,
                marginBottom: 20,
                width: "100%",
              }}
            >
              Parking Lot Entry QR Code
            </Text>
            <QRCode value={JSON.stringify(parkingLotDataExit)} size={200} />
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

export default QRCodeGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
