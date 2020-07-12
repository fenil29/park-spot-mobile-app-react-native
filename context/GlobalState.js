import React, { createContext, Component } from "react";

export const GlobalContext = createContext();

export default class GlobalState extends Component {
  state = { loginData: {} };
  setLoginInfo = state => {
    this.setState({ loginData: state });
  };
  componentDidMount=()=> {
    // this.props.navigation.navigate("Login");

    console.log("from global state");
    // this.props.navigation.navigate("Login");
  }
  render() {
    return (
      <GlobalContext.Provider
        value={{ state: this.state, setLoginInfo: this.setLoginInfo }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
