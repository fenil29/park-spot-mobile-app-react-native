import React, { Component, UserContext } from "react";

import {
  StyleSheet,
  View,
  BackHandler,
  SafeAreaView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";

import { AreaChart, Grid } from "react-native-svg-charts";
import { GlobalContext } from "../context/GlobalState";

import Colors from "../constants/colors";
import serverUrl from "../constants/apiUrl";

import axios from "axios";
import moment from "moment-timezone";
export class ViewAllEntry extends Component {
  static contextType = GlobalContext;
  state = {
    data: [],
    loading: true,
    refreshLoading: false,
  };

  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  componentDidMount = () => {
    this.setState({ loading: true });
    this.fetchAllEntry();
  };
  handleRefresh = () => {
    this.setState({ refreshLoading: true });
    this.fetchAllEntry();
  };
  fetchAllEntry = () => {
    axios
      .get(
        serverUrl + "/history/id/" + this.context.state.loginData.user_user_id,
        {
          headers: {
            "jwt-token": this.context.state.loginData["jwt-token"],
          },
        }
      )
      .then((response) => {
        console.log(response.data[0]);
        this.setState({
          data: response.data,
          loading: false,
          refreshLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
        ToastAndroid.show("Something went wrong. Please try again", 2000);
      });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="View All Entry"
          alignment="center"
          leftControl={this.BackAction()}
        />
        {!this.state.loading ? (
          this.state.data.length === 0 ? (
            <Text style={{ textAlign: "center" }}>No Data available</Text>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshLoading}
                  onRefresh={this.handleRefresh}
                />
              }
              keyExtractor={(item, index) => index.toString()}
              data={this.state.data}
              renderItem={({ item }) => {
                // let inTime = moment.tz(item.in_time, "Asia/kolkata").format()
                let inTime = moment(item.in_time).format("L  -  LTS")

                let outTime =moment(item.out_time).format("L  -  LTS")


                return (
                  <View style={{ marginHorizontal: 20 }}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginVertical: 10,
                        }}
                      >
                        <Text>{item.pd_loc_name}</Text>
                        <View>
                          <Text>{item.payment} ₹</Text>
                        </View>
                      </View>
                      <View>
                        <Text>Entry Time : {inTime}</Text>
                        <Text>
                          Exit Time{"   "} : {outTime}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )
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

export default ViewAllEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
