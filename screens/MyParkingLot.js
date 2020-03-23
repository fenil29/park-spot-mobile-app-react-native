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
  FlatList
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";

import { MaterialCommunityIcons } from "@expo/vector-icons";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";

import axios from "axios";
export class MyParkingLot extends Component {
  state = {
    data: []
  };
  BackIcon = style => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  componentDidMount = () => {
    axios
      .get("http://192.168.0.200:3000/parking")
      .then(response => {
        console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="My Parking Lot"
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
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              // key={item.pd_lot_id}
              onPress={() =>
                this.props.navigation.navigate("ParkingLotDetails", {
                  data: item
                })
              }
            >
              <View style={{ marginHorizontal: 20 }}>
                <View
                  style={{
                    borderBottomWidth: 1
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginVertical: 20
                    }}
                  >
                    <Text>{item.pd_loc_name}</Text>
                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate("QRCodeGenerator", {
                          data: item
                        })
                      }
                    >
                      <MaterialCommunityIcons
                        name="qrcode"
                        size={30}
                        color="black"
                        // color={Colors.primary}
                        color="black"
                      />
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={(item) => item.pd_lot_id}
        />
      </Layout>
    );
  }
}

export default MyParkingLot;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Platform.OS === "android" ? 24 : 0
  }
});
