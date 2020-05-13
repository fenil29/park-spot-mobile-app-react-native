import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import {
  Button,
  Text,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";

export default function App(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  let isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    if (isJson(data)) {
      data = JSON.parse(data);
      console.log(data);
      if (data.type == "find-my-spot-qr-code") {
        if (data.access == "entry") {
          props.navigation.replace("ParkingSpotDetails", { data: data });
        }
        if (data.access == "exit") {
          props.navigation.replace("ParkingLotExit", { data: data });
        }
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text>No access to camera</Text>
      </View>
    );
  }
  let BackIcon = (style) => <Icon {...style} name="arrow-ios-back-outline" />;

  let BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPressIn={() => props.navigation.goBack()}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        title="Scan QR Code"
        alignment="center"
        leftControl={BackAction()}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* <Text>QR Code Scanner</Text> */}
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
      {/* <SafeAreaView style={styles.container}>
     <Container>
       <Header
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
          <Right>
           <Button transparent>
             <Icon name='menu' />
           </Button>
         </Right>
       </Header>
       <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
         />
       </Container>
 </SafeAreaView>  */}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 24 : 0
  },
});
