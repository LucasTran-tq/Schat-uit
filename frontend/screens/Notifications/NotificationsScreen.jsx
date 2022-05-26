import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Header from "../../components/Notifications/Header.js";
import Body from "../../components/Notifications/Body";

const NotificationsScreen = () => {
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

export default NotificationsScreen;
