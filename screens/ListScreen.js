import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import api from "../utils/api";

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: "User lists",
    headerStyle: { backgroundColor: "#f7fffc" },
    headerTintColor: "#188167",
    headerTitleStyle: { fontWeight: "bold" }
  };
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      toDelete: ""
    };
  }

  async componentDidMount() {
    this._getUsers();
  }

  _getUsers = async () => {
    try {
      const result = await api.get("/all");
      this.setState({ users: result.data.users });
      //console.log(result.data.users);
    } catch (err) {
      console.log("Error map");
      console.log(err.response.status);
      console.log(err.response.data);
    }
  };

  userDelete() {
    try {
      //console.log(`/delete/${this.state.toDelete}`);
      //console.log(this.state.toDelete);
      api.delete("/delete/" + this.state.toDelete);
      this.setState(prevState => {
        return {
          users: prevState.users.filter(place => {
            return place.user.id !== this.state.toDelete;
          })
        };
      });
      //console.log(this.state.users);
    } catch (err) {
      console.log("Error delete");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.users.length > 0
            ? this.state.users.map(element => (
                <TouchableOpacity
                  key={element.user.id}
                  style={styles.fixToText}
                  onLongPress={() => {
                    this.setState({ toDelete: element.user.id });
                    this.userDelete();
                  }}
                >
                  <Text style={styles.userNames}>{element.user.name}</Text>
                  <Text style={styles.deleteButton}> Delete </Text>
                </TouchableOpacity>
              ))
            : undefined}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  userNames: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d5b895",
    fontFamily: "space-mono"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10
  },
  deleteButton: {
    fontSize: 16,
    backgroundColor: "#d5b895",
    color: "white",
    fontFamily: "space-mono",
    fontWeight: "bold",
    padding: 5
  }
});
