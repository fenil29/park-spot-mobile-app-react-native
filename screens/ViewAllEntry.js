import React, { Component, UserContext } from "react";

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
  TopNavigationAction,
} from "@ui-kitten/components";

import { AreaChart, Grid } from "react-native-svg-charts";
import { GlobalContext } from "../context/GlobalState";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";

import URL from "../constants/apiUrl";
import axios from "axios";

export class ViewAllEntry extends Component {
  static contextType = GlobalContext;
  state = {
    data: [],
  };

  BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  componentDidMount = () => {
    console.log(this.context.state.loginData.user_user_id);
    axios
      .get(URL + "/history/id/" + this.context.state.loginData.user_user_id)
      .then((response) => {
        console.log(response.data.slice(0, 20));
        this.setState({ data: response.data.slice(0, 20) });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <GlobalContext.Consumer>
        {(context) => {
          return (
            <Layout style={styles.container}>
              <TopNavigation
                title="View All Entry"
                alignment="center"
                leftControl={this.BackAction()}
              />
              <FlatList
              keyExtractor={(item, index) => index.toString()}
                data={this.state.data}
                renderItem={({ item }) => 
              {  let inTime=new Date(item.in_time).toLocaleString()
                let outTime=new Date(item.out_time).toLocaleString()
                
                return (
            
                    <View style={{ marginHorizontal: 20 }}>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          paddingBottom:10
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
                          <Text>Parking Lot name</Text>
                         <View><Text>payment</Text></View>
                        </View>
                        <View>
                        <Text>Entry Date : {inTime}</Text>
                        <Text>Exit Date{"   "} : {outTime}</Text>
                        </View>
                      </View>
                    </View>
                )}
              }
              
              />
            </Layout>
          );
        }}
      </GlobalContext.Consumer>
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
