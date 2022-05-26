import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Header from "../../components/NotificationSetting/Header.js";
import Body from "../../components/NotificationSetting/Body.js";
const NotificationSetting = () => {
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
  },
});

export default NotificationSetting;
