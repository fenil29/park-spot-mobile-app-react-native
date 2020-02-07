import {
    StyleSheet,
  } from "react-native";

import Colors from "./colors"
  
export default {
  style: StyleSheet.create({
    container: {
      flex: 1
      // paddingTop: Platform.OS === "android" ? 24 : 0
    },
    input: {
      width: "80%",
      alignItems: "flex-end",
      borderWidth: 0.1,
      borderColor: Colors.primary,
      padding: 10,
      marginTop: 20,
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3
      // backgroundColor:"#e8e8e8"
    },
    button:{
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 50,
        // backgroundColor:"#555"
        width: "50%",
        maxWidth: 300,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8
    }
  })
};
