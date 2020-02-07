import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  AsyncStorage
} from "react-native";

import Login from "../screens/Login";
import ParkingSpotDetails from "../components/ParkingSpotDetails";
import QRCode from "../components/QRCode";
import FirstLogin from "../screens/FirstLogin";
import Home from "../screens/admin-screens/Home";
import MyProfile from "../screens/MyProfile";
import AddParkingLot from "../screens/AddParkingLot";
import ShowParkingLotMap from "../screens/ShowParkingLotMap";
import SelectLocationMaps from "../screens/SelectLocationMaps";

import Colors from "../constants/colors";

import { 
  Feather,MaterialCommunityIcons } from "@expo/vector-icons";


const CustomDrawerComponent = props => {
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          backgroundColor: Colors.primary,
          height: 100,
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
          // flex:1,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>
          Fenil Kaneria
        </Text>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const SideNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,

      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: () => (
         
          <Feather
          name="home"
          size={25}
          color="black"
          style={{
            // backgroundColor:"red"
          }}
        />
        )
      }
    },
    "My Profile": {
      screen: MyProfile,
      navigationOptions: {
        drawerLabel: "Account",
        drawerIcon: () => (
         
          <MaterialCommunityIcons
          name="account-outline"
          size={27}
          color="#000000"
          style={{
            // backgroundColor:"red"
          }}
        />
        )
      }
    }
  },
  {
    contentComponent: CustomDrawerComponent,
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      // labelStyle: {
      //   // fontFamily: 'SomeFont',
      //   color: '#00f',

      // },
      // labelStyle : {
      //   // fontFamily: 'SomeFont',
      //   backgroundColor: '#f00',
      //   // height:100,

      // },
      // itemsContainerStyle  : {
      //   // fontFamily: 'SomeFont',
      //   backgroundColor: '#0f0',
      //   // height:100,

      // },
      // activeBackgroundColor: "#",
      // activeTintColor: "#000"
      activeBackgroundColor: "#fff",
      activeTintColor: "#000"
    }
  }
);

const MainNavigator = createStackNavigator({
  // LockScreen: {
  //   screen: LockScreen,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  FirstLogin: {
    screen: FirstLogin,
    navigationOptions: {
      headerShown: false
    }
  },
  HomeScreen: {
    screen: SideNavigator,
    navigationOptions: {
      headerShown: false
    }
  },
  QRCode: {
    screen: QRCode,
    navigationOptions: {
      headerShown: false
    }
  },
  ParkingSpotDetails: {
    screen: ParkingSpotDetails,
    navigationOptions: {
      headerShown: false
    }
  },
  AddParkingLot: {
    screen: AddParkingLot,
    navigationOptions: {
      headerShown: false
    }
  },
  ShowParkingLotMap: {
    screen: ShowParkingLotMap,
    navigationOptions: {
      headerShown: false
    }
  },
  SelectLocationMaps: {
    screen: SelectLocationMaps,
    navigationOptions: {
      headerShown: false
    }
  }
});

export default createAppContainer(MainNavigator);
