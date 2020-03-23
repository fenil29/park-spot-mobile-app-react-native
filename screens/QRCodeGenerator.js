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

import QRCode from "react-native-qrcode-svg";

// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";

export class QRCodeGenerator extends Component {
  BackIcon = style => <Icon {...style} name="arrow-ios-back-outline" />;

  BackAction = () => (
    <TopNavigationAction
      icon={this.BackIcon}
      onPressIn={() => this.props.navigation.goBack()}
    />
  );
  render() {
    const fill = "rgb(134, 65, 244)";
    return (
      <Layout style={styles.container}>
        <TopNavigation
          title="Parking Lot QR Code"
          alignment="center"
          leftControl={this.BackAction()}
        />
        <Text>{JSON.stringify(this.props.navigation.state)}</Text>
        <QRCode value={JSON.stringify(this.props.navigation.state)} />
      </Layout>
    );
  }
}

export default QRCodeGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Platform.OS === "android" ? 24 : 0
  }
});
