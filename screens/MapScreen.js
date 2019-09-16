import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView from "react-native-maps";

const { width, height } = Dimensions.get("window");

import api from "../utils/api";

export default class MapScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 43.8486719,
        longitude: 18.3901648,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068
      },
      locationResult: null,
      location: { coords: { latitude: 44.015316, longitude: 18.027134 } },
      markers: [],
      count: 0
    };
  }

  async componentDidMount() {
    this._getOtherUsersLocation();
  }

  _handleMapRegionChange = region => {
    this.setState({ region });
  };

  _getOtherUsersLocation = async () => {
    try {
      const result = await api.get("/all");
      this.setState({ markers: result.data.users });
      //console.log(result.data.users);
    } catch (err) {
      console.log("Error map");
      console.log(err.response.status);
      console.log(err.response.data);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: "stretch", height: height - 20, width }}
          initialRegion={this.state.region}
          onRegionChange={this._handleMapRegionChange}
          loadingEnabled={true}
          followuserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
        >
          {this.state.markers.length > 0
            ? this.state.markers.map(element => (
                <MapView.Marker
                  key={element.user.id}
                  coordinate={element.coords}
                  title={element.user.name}
                  onCalloutPress={() => {
                    this.marker.hideCallout();
                  }}
                >
                  <MapView.Callout tooltip={true}>
                    <View style={styles.callout}>
                      <Text style={styles.calloutText}>
                        Name: {element.user.name}
                      </Text>
                      <Text style={styles.calloutText}>
                        Mass: {element.user.mass}
                      </Text>
                      <Text style={styles.calloutText}>
                        Volume: {element.user.volume}
                      </Text>
                      <Text style={styles.calloutText}>
                        Order number: {this.state.count}
                      </Text>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              ))
            : undefined}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  callout: {
    backgroundColor: "#f7fffc",
    padding: 30,
    opacity: 0.8
  },
  calloutText: {
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
    color: "#188167"
  }
});
