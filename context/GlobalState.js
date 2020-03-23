import React, { createContext, Component } from "react";

export const GlobalContext = createContext("kaneria");

export class GlobalState extends Component {
  state = { loginData: {}};
  setLoginInfo = state => {
    this.setState({ loginData:state });
  };
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
