import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import ListScreen from "../screens/ListScreen";
import LoginScreen from "../screens/LoginScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarOptions: {
    activeTintColor: "#188167",
    inactiveTintColor: "#d4f7ee",
    showIcon: true,
    showLabel: false,
    lazyLoad: true,
    style: {
      backgroundColor: "#f7fffc"
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

HomeStack.path = "";

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  config
);

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarOptions: {
    activeTintColor: "#188167",
    inactiveTintColor: "#d4f7ee",
    showIcon: true,
    showLabel: false,
    lazyLoad: true,
    style: {
      backgroundColor: "#f7fffc"
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person-add" : "md-person-add"}
    />
  )
};

LoginStack.path = "";

const MapStack = createStackNavigator(
  {
    Map: MapScreen
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarOptions: {
    activeTintColor: "#188167",
    inactiveTintColor: "#d4f7ee",
    showIcon: true,
    showLabel: false,
    lazyLoad: true,
    style: {
      backgroundColor: "#f7fffc"
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-globe" : "md-globe"}
    />
  )
};

MapStack.path = "";

const ListStack = createStackNavigator(
  {
    Settings: ListScreen
  },
  config
);

ListStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarOptions: {
    activeTintColor: "#188167",
    inactiveTintColor: "#d4f7ee",
    showIcon: true,
    showLabel: false,
    lazyLoad: true,
    style: {
      backgroundColor: "#f7fffc"
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-list" : "md-list"}
    />
  )
};

ListStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LoginStack,
  MapStack,
  SettingsStack: ListStack
});

tabNavigator.path = "";

export default tabNavigator;
