import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
  StyleSheet,
  Dimensions
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import LoginButton from "./LoginButton";
import api from "../utils/api";
const window = Dimensions.get("window");

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mass: "",
      volume: "",
      address: "",
      isLoggedIn: false,
      location: { coords: { latitude: 44.015316, longitude: 18.027134 } },
      errorMessage: null
    };
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  userLogin() {
    const name = this.state.name.trim(),
      mass = this.state.mass.trim(),
      volume = this.state.volume.trim(),
      address = this.state.address.trim(),
      latitude = this.state.location.coords.latitude,
      longitude = this.state.location.coords.longitude;

    if (!name || !mass || !volume || !address) {
      Alert.alert("Invalid input", `All fields are required! `);
    } else {
      api
        .post("/register", {
          name,
          mass,
          volume,
          address,
          latitude,
          longitude
        })
        .then(response => {
          console.log(response.data);
          this.props.navigation.navigate("Map");
          this.inputName.clear();
          this.inputMass.clear();
          this.inputVolume.clear();
          this.inputAddress.clear();
        })
        .catch(err => {
          console.log("ERROR");
          console.log(err.response.status);
          console.log(err.response.data);
          Alert.alert(
            `Status: ${err.response.status} Message: ${err.response.data}`
          );
          this.inputName.clear();
          this.inputMass.clear();
          this.inputVolume.clear();
          this.inputAddress.clear();
        });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <TextInput
            style={style.input}
            name="name"
            autoCorrect={false}
            placeholder="Name"
            placeholderTextColor="#d5b895"
            autoCapitalize="words"
            returnKeyType="next"
            ref={ref => (this.inputName = ref)}
            onChangeText={name => this.setState({ name })}
          >
          </TextInput>
          <TextInput
            style={style.input}
            name="mass"
            autoCorrect={false}
            placeholder="Mass"
            placeholderTextColor="#d5b895"
            autoCapitalize="none"
            returnKeyType="next"
            ref={ref => (this.inputMass = ref)}
            onChangeText={mass => this.setState({ mass })}
          >
          </TextInput>
          <TextInput
            style={style.input}
            name="volume"
            autoCorrect={false}
            placeholder="Volume"
            placeholderTextColor="#d5b895"
            autoCapitalize="none"
            returnKeyType="next"
            ref={ref => (this.inputVolume = ref)}
            onChangeText={volume => this.setState({ volume })}
          >
          </TextInput>
          <TextInput
            style={style.input}
            name="address"
            autoCorrect={false}
            placeholder="Address"
            placeholderTextColor="#d5b895"
            autoCapitalize="words"
            returnKeyType="next"
            ref={ref => (this.inputAddress = ref)}
            onChangeText={address => this.setState({ address })}
          >
          </TextInput>
          <LoginButton userLogin={this.userLogin.bind(this)} />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 20,
    height: 50,
    width: window.width - 60,
    color: "#188167",
    borderBottomWidth: 1,
    borderBottomColor: "#188167"
  },
  heading: {
    color: "#f7fffc",
    fontSize: 24,
    width: window.width - 60,
    marginBottom: 15,
    paddingBottom: 20,
    textAlign: "center"
  }
});
