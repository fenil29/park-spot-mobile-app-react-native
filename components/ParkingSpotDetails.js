import React, { Component } from "react";

import {
  StyleSheet,
  Text,
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
  // Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";

export class ParkingSpotDetails extends Component {
  BackIcon = style => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="Parking Spot Details"
          alignment="center"
          leftControl={this.BackAction()}
        />
        {/* <Header style={{ backgroundColor: "white" }} iosStatusbar="dark-content" androidStatusBarColor="white">
          <StatusBar barStyle="dark-content"/>
            <Left>
              <Button
                transparent
                onPressIn={() => this.props.navigation.goBack()}
              >
                <Icon name="arrow-back" style={{ color: "black" }} />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "black" }}>Parking Spot Details</Title>
            </Body>
            <Right />
          </Header> */}
        <View>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderWidth: 0.1,
              borderColor: Colors.primary,
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6
            }}
          >
            <Text>Your Parking Spot Is:</Text>
            <Text style={{ textAlign: "center", fontSize: 150 }}>17</Text>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderWidth: 0.1,
              borderColor: "black",
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6
            }}
          >
            <Text>Parking Lot Details</Text>
            <Text>name</Text>
            <Text>Address</Text>
          </View>
        </View>
      </Layout>
    );
  }
}

export default ParkingSpotDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Platform.OS === "android" ? 24 : 0
  }
});
