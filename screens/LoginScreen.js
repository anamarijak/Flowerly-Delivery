import React, { Component } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";

import LoginForm from "../components/LoginForm";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: "Shipping Information",
    headerStyle: { backgroundColor: "#f7fffc" },
    headerTintColor: "#188167",
    headerTitleStyle: { fontWeight: "bold" }
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={style.container}
        behavior={"padding"}
        enabled
      >
        <LoginForm navigation={this.props.navigation} />
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
