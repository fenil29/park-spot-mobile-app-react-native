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

import Colors from "../../constants/colors";

import ScanQrCodeCard from "../../components/ScanQrCodeCard"
import ParkingSpotsCard from "../../components/ParkingSpotsCard"

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
            <ScanQrCodeCard onClick={()=> this.props.navigation.navigate("QRCode")}/>
            <ParkingSpotsCard onClick={()=>  console.log("home card")}/>
            

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
