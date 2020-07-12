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

import serverUrl from "../constants/apiUrl";

export class ParkingSpotDetails extends Component {
  static contextType = GlobalContext;

  state = {
    data: {},
    loading: true,
    error: false,
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
    let lotId = this.props.navigation.state.params.data.id;
    console.log(serverUrl + "/spot/get/" + lotId);
    axios
      .post(serverUrl + "/spot/get/" + this.context.state.loginData.user_user_id, {
        lotId: lotId,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ data: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.status == 400) {
          this.setState({ loading: false,error:error.response.data.error_message });          
          this.setState({data:error.response.data})
        }
      });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="Parking Spot Details"
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
              {!this.state.error ? (
                <React.Fragment>
                  <Text>Your Parking Spot Is:</Text>
              <Text style={{ textAlign: "center", fontSize: 150 }}>{this.state.data.spot_no}</Text>
                </React.Fragment>
              ) : (
              <Text>{this.state.error}</Text>
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
              <Text style={{borderBottomWidth:1,borderBottomColor:"#d9d9d9",paddingBottom:10}}>Parking Lot Details</Text>
              <Text style={{paddingTop:10}}>Name : {this.state.data.pd_loc_name}</Text>
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

export default ParkingSpotDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
