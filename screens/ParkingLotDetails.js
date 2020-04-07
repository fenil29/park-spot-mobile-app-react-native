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
  Picker,
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";

import { BarChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import DateTimePicker from "@react-native-community/datetimepicker";

import Colors from "../constants/colors";
import style from "../constants/style";

import axios from "axios";
import serverUrl from "../constants/apiUrl";

export class ParkingLotDetails extends Component {
  state = {
    data: this.props.navigation.state.params.data,
    graphData: [
      7,
      6,
      4,
      3,
      1,
      5,
      8,
      6,
      4,
      2,
      4,
      6,
      2,
      6,
      3,
      6,
      2,
      1,
      7,
      8,
      5,
      3,
      1,
      10,
    ],
    graphLoading: true,
    showDatePicker: false,
    date: Date.now() - 24 * 60 * 60 * 1000 * 1,
    dataVisualizationType: "day",
  };
  componentDidMount = () => {
    this.fetchLotDetailsFormServer(Date.now() - 24 * 60 * 60 * 1000 * 1);
  };
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  onDateChange = (date) => {
    this.setDatePicker(false);
    console.log(date.nativeEvent.timestamp);
    if (date.nativeEvent.timestamp) {
      this.setState({ date: date.nativeEvent.timestamp });
      this.fetchLotDetailsFormServer(date.nativeEvent.timestamp);
    }
  };
  fetchLotDetailsFormServer = (timestamp) => {
    this.setState({ graphLoading: true });
    let date = new Date(timestamp);
    let dateString =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    axios
      .post(serverUrl + "/lothistory", {
        lotid: this.state.data.pd_lot_id,
        date: dateString,
      })
      .then((response) => {
        this.setState({ graphLoading: false });
        let chratData = [];
        let responseData;
        // console.log(response.data);
        if (!response.data[0] == 0) {
          responseData = response.data[0];
          delete responseData.pd_lot_id;
          delete responseData.lh_id;
          delete responseData.date;
          for (let hourData in responseData) {
            chratData.push(responseData[hourData]);
            console.log(hourData);
          }
        }

        this.setState({ graphData: chratData });
      })
      .catch((error) => {
        this.setState({ graphLoading: false });
        console.log(error);
      });
  };
  onVisualizationTypeChange = (type) => {
    this.setState({ dataVisualizationType: type });
  };
  setDatePicker = (bool) => {
    this.setState({ showDatePicker: bool });
  };
  render() {
    let lotInfo = this.state.data;
    let today = new Date(this.state.date);
    return (
      <ScrollView style={styles.container}>
        <TopNavigation
          title="Parking Lot Details"
          alignment="center"
          leftControl={this.BackAction()}
        />
        {this.state.showDatePicker && (
          <DateTimePicker
            value={this.state.date}
            is24Hour={true}
            display="default"
            onChange={this.onDateChange}
          />
        )}
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
        {/* <Text>{JSON.stringify(lotInfo)}</Text> */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            borderWidth: 0.1,
            borderColor: "black",
            padding: 15,
            paddingBottom: 20,
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
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#d9d9d9",
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            Parking Lot History
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View
              style={{
                ...style.style.input,
                marginTop: 5,
                width: "40%",
              }}
            >
              <Picker
                selectedValue={this.state.dataVisualizationType}
                enabled={this.state.editMode}
                style={{
                  height: 20,
                  width: "100%",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.onVisualizationTypeChange(itemValue)
                }
              >
                <Picker.Item label="day" value="day" />
                <Picker.Item label="week" value="week" />
              </Picker>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress ={() => {
                this.setDatePicker(true);
              }}
              style={{
                ...style.style.input,
                marginTop: 5,
                width: "40%",
                justifyContent: "center",
              }}
            >
              <Text>
                {/* Select Date */}
                {today.getDate() +
                  " - " +
                  (today.getMonth() + 1) +
                  " - " +
                  today.getFullYear()}
              </Text>
            </TouchableOpacity>
          </View>

          {!this.state.graphLoading ? (
            !this.state.graphData.length == 0 ? (
              <ScrollView horizontal={true}>
                <View style={{ width: 18 * this.state.graphData.length }}>
                  <View style={{ height: 250, flexDirection: "row" }}>
                    <View style={{marginTop:90,marginRight:10}}>
                      <Text style={{fontSize:11}}>s</Text>
                      <Text style={{fontSize:11}}>p</Text>
                      <Text style={{fontSize:11}}>o</Text>
                      <Text style={{fontSize:11}}>t</Text>
                    </View>

                    <YAxis
                      data={[...this.state.graphData, lotInfo.total_spot]}
                      svg={{
                        fill: "black",
                        fontSize: 10,
                      }}
                      contentInset={{ top: 40, bottom: 20 }}
                      numberOfTicks={10}
                      formatLabel={(value) => `${value}`}
                    />
                    <BarChart
                      style={{ flex: 1, marginLeft: 16 }}
                      data={this.state.graphData}
                      svg={{ fill: Colors.primary }}
                      contentInset={{ top: 30, bottom: 30 }}
                    >
                      <Grid />
                    </BarChart>
                  </View>
                  <XAxis
                    style={{ marginHorizontal: 0 }}
                    data={this.state.graphData}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 30, right: 10 }}
                    svg={{ fontSize: 10, fill: "black" }}
                  />
                  <View style={{alignItems:"center"}}>

                  <Text style={{fontSize:12}}>{this.state.dataVisualizationType}</Text>
                  </View>
                </View>
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 250,
                }}
              >
                <Text>No Data Found!</Text>
              </View>
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 250,
              }}
            >
              <Spinner color="blue" />
            </View>
          )}
        </View>
      </ScrollView>
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
