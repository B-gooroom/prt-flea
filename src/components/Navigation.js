import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Market from "../screens/Market";
import Article from "../screens/Article";
import Mypage from "../screens/Mypage";

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            headerTintColor: "#fff",
            headerStyle: {
              shadowColor: "transparent",
            },
            tabBarIcon: ({ focused }) => (
              <Image
                style={{ width: 24, height: 24 }}
                source={
                  focused
                    ? require("../../assets/img/home_line.png")
                    : require("../../assets/img/home_line_grey.png")
                }
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#000000" : "#9b9b9b",
                  fontSize: 8,
                }}
              >
                HOME
              </Text>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={styles.circle}
                onPress={() => alert("This is a Ranking!")}
              >
                <Text style={styles.rank}>🏁 실시간 랭킹</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => alert("This is button")}
                style={styles.btn}
              >
                <Image
                  style={{ width: 24, height: 24, marginRight: 20 }}
                  source={require("../../assets/img/cart_line.png")}
                />
                <Image
                  style={{ width: 24, height: 24, marginRight: 16 }}
                  source={require("../../assets/img/notification_line.png")}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="market"
          component={Market}
          options={{
            title: "마켓",
            headerTitleAlign: "left",
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: 700,
              fontSize: 24,
            },
            headerStyle: {
              shadowColor: "transparent",
            },
            tabBarIcon: ({ focused }) => (
              <Image
                style={{ width: 24, height: 24 }}
                source={
                  focused
                    ? require("../../assets/img/auction_line.png")
                    : require("../../assets/img/auction_line_grey.png")
                }
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#000000" : "#9b9b9b",
                  fontSize: 8,
                }}
              >
                MARKET
              </Text>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => alert("This is search")}>
                <Image
                  style={{ width: 24, height: 24, marginRight: 20 }}
                  source={require("../../assets/img/search_line.png")}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="article"
          component={Article}
          options={{
            title: "아티클",
            headerTitleAlign: "left",
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: 700,
              fontSize: 24,
            },
            headerStyle: {
              shadowColor: "transparent",
            },
            tabBarIcon: ({ focused }) => (
              <Image
                style={{ width: 24, height: 24 }}
                source={
                  focused
                    ? require("../../assets/img/profile_line.png")
                    : require("../../assets/img/profile_line_grey.png")
                }
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#000000" : "#9b9b9b",
                  fontSize: 8,
                }}
              >
                ARTICLE
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="mypage"
          component={Mypage}
          options={{
            headerTintColor: "#fff",
            tabBarIcon: ({ focused }) => (
              <Octicons
                name="person"
                color={focused ? "#000000" : "#9b9b9b"}
                size={22}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? "#000000" : "#9b9b9b",
                  fontSize: 8,
                }}
              >
                MYPAGE
              </Text>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => alert("This is setting")}
                style={styles.btn}
              >
                <Image
                  style={{ width: 24, height: 24, marginRight: 20 }}
                  source={require("../../assets/img/settings_line.png")}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
  },
  circle: {
    borderRadius: 18,
    marginLeft: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rank: {
    backgroundColor: "#fff",
    fontSize: 20,
    fontWeight: 700,
    borderRadius: 18,
    textAlign: "center",
    overflow: "hidden",
    padding: 8,
  },
});

export default Navigation;
