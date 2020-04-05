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
  Spinner,
} from "@ui-kitten/components";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";

import URL from "../constants/apiUrl";

export class ParkingLotExit extends Component {
  static contextType = GlobalContext;

  state = {
    data: {},
    loading: true,
    isParkingFull: false,
  };
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );

  componentDidMount = () => {
    console.log(this.props.navigation.state.params.data);
    let spotId = this.props.navigation.state.params.data.id;
    console.log(URL + "/spot/get/" + spotId);
    axios
      .post(URL + "/spot/left/" + spotId, {
        user: this.context.state.loginData.user_user_id,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ data: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.status == 400) {
          this.setState({ loading: false, isParkingFull: true });
          this.setState({ data: error.response.data });
        }
      });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="ParkingLotExit"
          alignment="center"
          leftControl={this.BackAction()}
        />
        {!this.state.loading ? (
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
              {!this.state.isParkingFull ? (
                <React.Fragment>
                  <Text>Your Parking Spot Is:</Text>
                  <Text style={{ textAlign: "center", fontSize: 150 }}>
                    {this.state.data.spot_no}
                  </Text>
                </React.Fragment>
              ) : (
                <Text>Sorry Parking is full</Text>
              )}
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
              <Text
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#d9d9d9",
                  paddingBottom: 10,
                }}
              >
                Parking Lot Details
              </Text>
              <Text style={{ paddingTop: 10 }}>
                Name : {this.state.data.pd_loc_name}
              </Text>
              <Text>Address : {this.state.data.pd_loc_address}</Text>
              <Text>Total Spot : {this.state.data.total_spot}</Text>
              <Text>Occupied Spot : {this.state.data.occupied_spot}</Text>
              <Text>Hourly Rate : {this.state.data.pd_hrly_rate}</Text>
              {/* <Text>{JSON.stringify(this.state.data)}</Text> */}
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner color="blue" />
          </View>
        )}
      </Layout>
    );
  }
}

export default ParkingLotExit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
