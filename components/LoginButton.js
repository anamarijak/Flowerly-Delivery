import React, { Component } from "react";
import { Button } from "react-native";

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        title="Save"
        color="#188167"
        onPress={() => this.props.userLogin()}
      />
    );
  }
}
