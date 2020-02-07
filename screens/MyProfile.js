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
      <Layout style={styles.container}>
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
      </Layout>
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
