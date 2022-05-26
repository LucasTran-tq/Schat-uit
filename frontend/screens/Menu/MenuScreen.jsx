import React from "react";
import { Text, StyleSheet, View } from "react-native";

import Header from "../../components/Menu/Header.js";
import Body from "../../components/Menu/Body.js";
const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
});

export default MenuScreen;
