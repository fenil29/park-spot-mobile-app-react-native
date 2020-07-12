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

import LoadingScreen from "../screens/LoadingScreen";
import Login from "../screens/Login";
import GlobalState from "../context/GlobalState";
import ParkingSpotDetails from "../screens/ParkingSpotDetails";
import ParkingLotExit from "../screens/ParkingLotExit";
import QRCode from "../components/ScanQRCode";
import FirstLogin from "../screens/FirstLogin";
import ProviderHome from "../screens/provider-screens/Home";
import UserHome from "../screens/user-screens/Home";
import MyProfile from "../screens/MyProfile";
import MyParkingLot from "../screens/MyParkingLot";
import ViewAllEntry from "../screens/ViewAllEntry";
import ParkingLotDetails from "../screens/ParkingLotDetails";
import AddParkingLot from "../screens/AddParkingLot";
import ShowParkingLotMap from "../screens/ShowParkingLotMap";
import SelectLocationMaps from "../screens/SelectLocationMaps";
import QRCodeGenerator from "../screens/QRCodeGenerator";
import Logout from "../screens/Logout";
import { GlobalContext } from "../context/GlobalState";


import Colors from "../constants/colors";

import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons
} from "@expo/vector-icons";



class CustomDrawerComponent extends Component {
  static contextType = GlobalContext;

  render() {
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
        <Text style={{ color: "#fff", fontSize: 18 }}>{this.context.state.loginData.user_first_name +" "+ this.context.state.loginData.user_last_name}</Text>
      </View>
      <ScrollView>
        <DrawerItems {...this.props} />
      </ScrollView>
    </SafeAreaView>
    );
  }
}


const SideNavigatorProvider = createDrawerNavigator(
  {
    ProviderHome: {
      screen: ProviderHome,

      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: () => (
          <Feather
            name="home"
            size={25}
            color="black"
            style={
              {
                // backgroundColor:"red"
              }
            }
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
            style={
              {
                // backgroundColor:"red"
              }
            }
          />
        )
      }
    },
    ViewAllEntry: {
      screen: ViewAllEntry,
      navigationOptions: {
        drawerLabel: "View All Entry",
        drawerIcon: () => (
          <FontAwesome
            name="list-alt"
            size={20}
            color="black"
            style={
              {
                // backgroundColor:"red"
              }
            }
          />
        )
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: "Logout",
        drawerIcon: () => (
          <SimpleLineIcons
            name="logout"
            size={20}
            color="black"
            style={
              {
                // backgroundColor:"red"
              }
            }
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

const SideNavigatorUser = createDrawerNavigator(
  {
    UserHome: {
      screen: UserHome,

      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: () => (
          <Feather
            name="home"
            size={25}
            color="black"
            style={
              {
                // backgroundColor:"red"
              }
            }
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
            style={
              {
                // backgroundColor:"red"
              }
            }
          />
        )
      }
    },
    ViewAllEntry: {
      screen: ViewAllEntry,
      navigationOptions: {
        drawerLabel: "View All Entry",
        drawerIcon: () => (
          <FontAwesome
            name="list-alt"
            size={20}
            color="black"
            style={
              {
                // backgroundColor:"red"
              }
            }
          />
        )
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: "Logout",
        drawerIcon: () => (
          <SimpleLineIcons
            name="logout"
            size={20}
            color="black"
            style={
              {
                // backgroundColor:"red"
              }
            }
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
  LoadingScreen: {
    screen: LoadingScreen,
    navigationOptions: {
      headerShown: false
    }
  },
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
  ProviderHomeScreen: {
    screen: SideNavigatorProvider,
    navigationOptions: {
      headerShown: false
    }
  },
  UserHomeScreen: {
    screen: SideNavigatorUser,
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
  ParkingLotExit: {
    screen: ParkingLotExit,
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
  },
  ParkingLotDetails: {
    screen: ParkingLotDetails,
    navigationOptions: {
      headerShown: false
    }
  },
  QRCodeGenerator: {
    screen: QRCodeGenerator,
    navigationOptions: {
      headerShown: false
    }
  },
  MyParkingLot: {
    screen: MyParkingLot,
    navigationOptions: {
      headerShown: false
    }
  }
});

export default createAppContainer(MainNavigator);
