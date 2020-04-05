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
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import { BarChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";

import Colors from "../constants/colors";

export class ParkingLotDetails extends Component {
  state = {
    data: this.props.navigation.state.params.data,
  };
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  render() {
    let lotInfo = this.state.data;
    const fill = "rgb(134, 65, 244)";
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="Parking Lot Details"
          alignment="center"
          leftControl={this.BackAction()}
        />
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
        {/* <Text>{JSON.stringify(lotInfo)}</Text> */}
        <View style={{ height: 200, flexDirection: "row" }}>
          <YAxis
            data={[6, 5, 7, 4, 1, 9, 5, 3]}
            svg={{
              fill: "grey",
              fontSize: 10,
            }}
            contentInset={{ top: 20, bottom: 20 }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}`}
          />
          <BarChart
            style={{ flex: 1, marginLeft: 16 }}
            data={[6, 5, 7, 4, 1, 9, 5, 3]}
            svg={{ fill }}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <Grid />
          </BarChart>
        </View>
        <XAxis
          style={{ marginHorizontal: 0 }}
          data={[6, 5, 7, 4, 1, 9, 5, 3]}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: "black" }}
        />
      </Layout>
    );
  }
}

export default ParkingLotDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
