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

import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

import {GlobalContext} from "../context/GlobalState";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";

export class MyProfile extends Component {
  BackIcon = style => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  render() {
    return (
      <GlobalContext.Consumer>
           {context =>

        (<Layout style={styles.container}>
          <TopNavigation
            title="Account"
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
          <Text>profile info</Text>
          <AreaChart
            style={{ height: 200 }}
            data={[
              50,
              10,
              40,
              95,
              -4,
              -24,
              85,
              91,
              35,
              53,
              -53,
              24,
              50,
              -20,
              -80
            ]}
            contentInset={{ top: 30, bottom: 30 }}
            curve={shape.curveNatural}
            svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
          >
            <Grid />
          </AreaChart>
          <Text>{JSON.stringify(context)}</Text>
        </Layout>)
         }
     </GlobalContext.Consumer> 
    );
  }
}

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Platform.OS === "android" ? 24 : 0
  }
});
