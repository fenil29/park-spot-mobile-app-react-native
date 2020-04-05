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
  StatusBar,
} from "react-native";

import {
  // Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";

export class ParkingSpotDetails extends Component {
  state = {
    data: this.props.navigation.state.params.data,
    loading: true,
  };
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );

  // api call
  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="Parking Spot Details"
          alignment="center"
          leftControl={this.BackAction()}
        />
        {this.state.loading ? (
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
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
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
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
              }}
            >
              <Text>Parking Lot Details</Text>
              <Text>Name : {JSON.stringify(this.state.data.pd_loc_name)}</Text>
              <Text>
                Address : {JSON.stringify(this.state.data.pd_loc_address)}
              </Text>
              <Text>{JSON.stringify(this.state.data)}</Text>
            </View>
          </View>
        ) : (
          <Spinner color="blue" />
        )}
      </Layout>
    );
  }
}

export default ParkingSpotDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
