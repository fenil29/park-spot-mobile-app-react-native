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
  FlatList,
} from "react-native";

import {
  Text,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";

import { MaterialCommunityIcons } from "@expo/vector-icons";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";
import serverUrl from "../constants/apiUrl";

import { GlobalContext } from "../context/GlobalState";


import axios from "axios";
export class MyParkingLot extends Component {
  static contextType = GlobalContext;

  state = {
    data: [],
    loading: true,
  };
  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  componentDidMount = () => {
    // console.log()
    let userId=this.context.state.loginData.user_user_id
    axios
      .get(serverUrl + "/parking/" + userId)
      .then((response) => {
        console.log(response.data);
        this.setState({ data: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
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
        {!this.state.loading ? (
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableNativeFeedback
                // key={item.pd_lot_id}
                onPress={() =>
                  this.props.navigation.navigate("ParkingLotDetails", {
                    data: item,
                  })
                }
              >
                <View style={{ marginHorizontal: 20 }}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginVertical: 20,
                      }}
                    >
                      <Text>{item.pd_loc_name}</Text>
                      <TouchableNativeFeedback
                        onPress={() =>
                          this.props.navigation.navigate("QRCodeGenerator", {
                            data: item,
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

export default MyParkingLot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
