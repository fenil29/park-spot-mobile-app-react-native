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
  StatusBar
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";

import { BarChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";

export class ParkingLotDetails extends Component {
  BackIcon = style => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  render() {
    const fill = "rgb(134, 65, 244)";
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="Parking Lot Details"
          alignment="center"
          leftControl={this.BackAction()}
        />

        {/* <Header
          style={{ backgroundColor: "white" }}
          iosStatusbar="dark-content"
          androidStatusBarColor="white"
        >
          <StatusBar barStyle="dark-content" />
          <Left>
            <Button
              transparent
              onPressIn={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" style={{ color: "black" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "black" }}>Account</Title>
          </Body>
          <Right />
        </Header> */}
        <Text>{JSON.stringify(this.props.navigation.state)}</Text>
        <View style={{ height: 200, flexDirection: "row" }}>
          <YAxis
            data={[6, 5, 7, 4, 1, 9, 5, 3]}
            svg={{
              fill: "grey",
              fontSize: 10
            }}
            contentInset={{ top: 20, bottom: 20 }}
            numberOfTicks={10}
            formatLabel={value => `${value}`}
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
    flex: 1
    // paddingTop: Platform.OS === "android" ? 24 : 0
  }
});
