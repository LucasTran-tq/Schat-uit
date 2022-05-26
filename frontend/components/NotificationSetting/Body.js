import React, { useState } from "react";
import { Text, StyleSheet, View, Switch } from "react-native";

const Body = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Thông báo trò chuyện</Text>
          <Text style={styles.description}>
            Bật để hiển thị thông báo từ bạn bè
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <Switch
            trackColor={{ false: "#A6A6A6", true: "#27AAE1" }}
            thumbColor={isEnabled ? "white" : "white"}
            ios_backgroundColor="#E5E5E5"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginTop: "2%",
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
  },
  description: {
    fontSize: 11,
    color: "#A6A6A6",
  },
});

export default Body;
