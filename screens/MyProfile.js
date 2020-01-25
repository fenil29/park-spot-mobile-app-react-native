import React, { Component } from 'react'


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
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text
} from "native-base";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors";


export class MyProfile extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Container>
        <Header style={{ backgroundColor: "white" }} iosStatusbar="dark-content" androidStatusBarColor="white">
          <StatusBar barStyle="dark-content"/>
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
            {/* <Right>
                <Button transparent>
                  <Icon name='menu' />
                </Button>
              </Right> */}
          </Header>
          <Text >
        profile info
      </Text>
        </Container>
      </SafeAreaView>
      
     
      
    )
  }
}

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  }
});

