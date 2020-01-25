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
  TouchableWithoutFeedback 
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

import Colors from "../constants/colors";

import { Ionicons, Foundation } from "@expo/vector-icons";

export class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Container
        // style={{ backgroundColor: "#f7faff" }}
        >
          <Header
            style={{ backgroundColor: "white" }}
            iosStatusbar="dark-content"
            androidStatusBarColor="white"
          >
            <StatusBar barStyle="dark-content" />
            <Left>
              <Button
                transparent
                onPressIn={() => this.props.navigation.toggleDrawer()}
              >
                <Icon name="menu" style={{ color: "black" }} />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "black" }}>Find My Spot</Title>
            </Body>
            <Right />
            {/* <Right>
          <Button transparent>
            <Text>Cancel</Text>
          </Button>
        </Right> */}
          </Header>
          <View
            style={{
              flexDirection: "row",
              // backgroundColor:"blue",
              justifyContent: "space-between",
              marginHorizontal: 20,
              // marginTop: 30,
              flexWrap: "wrap"
              // height:"10"
            }}
          >
            <TouchableWithoutFeedback 
              onPress={() => this.props.navigation.navigate("QRCode")}
              style={{}}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // padding: 20,
                  height: 130,
                  width: "45%",
                  marginHorizontal: 5,
                  marginTop: 20,
                  borderColor: "#d9d9d9",
                  // borderWidth: 1,
                  borderRadius: 10,
                  // backgroundColor:"#22558519"
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  elevation: 7
                }}
              >
                <Ionicons
                  name="md-qr-scanner"
                  size={50}
                  color="black"
                  // color={Colors.primary}
                />
                <Text
                  style={{ fontSize: 13, marginTop: 10, 
                    // color: Colors.primary 
                    color:"black"

                  }}
                >
                  Scan QR Code
                </Text>
              </View>
            </TouchableWithoutFeedback >
            <TouchableWithoutFeedback 
              onPress={() => console.log("home card")}
              style={{}}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // padding: 20,
                  height: 130,
                  width: "45%",
                  marginHorizontal: 5,
                  marginTop: 20,
                  borderColor: "#d9d9d9",
                  // borderWidth: 1,
                  borderRadius: 10,
                  // backgroundColor:"#22558519"
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  elevation: 7
                }}
              >
                <Foundation
                  name="map"
                  size={50}
                  color="black"
                  // color={Colors.primary}
                  color="black"

                />
                <Text
                  style={{ fontSize: 13, marginTop: 10,
                    //  color: Colors.primary
                    color:"black"

                    
                    }}
                >
                  Parking Spots
                </Text>
              </View>
            </TouchableWithoutFeedback >

            {/* <View>
              <Foundation name="map" size={32} color="black" />
            </View> */}
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Platform.OS === "android" ? 24 : 0
  }
});
