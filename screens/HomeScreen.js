import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.welcomeImage}
          source={require("../assets/images/cacti.jpg")}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch"
              //backgroundColor: 'rgba(0,0,0,0.3)'
            }}
          >
            <Text style={styles.getStartedText}>Flowerly</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  welcomeImage: {
    flex: 1,
    resizeMode: "cover"
  },
  getStartedText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#d5b895",
    fontFamily: "space-mono",
    position: "absolute",
    bottom: 10,
    textShadowOffset: { width: 10, height: 10 },
    textShadowColor: "green"
  }
});
