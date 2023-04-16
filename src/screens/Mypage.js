import React from "react";
import { Text, View, StyleSheet } from "react-native";

function Mypage() {
  return (
    <View style={styles.container}>
      <Text>Mypage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Mypage;
