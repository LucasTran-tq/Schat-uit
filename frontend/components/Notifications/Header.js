import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.imgHeader}
        source={require("../../assets/HeaderBackground.png")}
        resizeMode="cover"
      />
      <View style={styles.innerContainer}>
        <View style={styles.leftInner}>
          <TouchableOpacity onPress={() => navigation.navigate("ListChat")}>
            <Ionicons name="chevron-back-outline" size={26} color="white" />
          </TouchableOpacity>
          <Text style={styles.txtNotification}>Thông báo</Text>
        </View>

        <View style={styles.rightInner}>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationSetting")}
          >
            <Ionicons name="settings-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    backgroundColor: "#27AAE1",
    justifyContent: "center",
  },
  imgHeader: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  innerContainer: {
    marginTop: "5%",
    marginHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtNotification: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "white",
    marginLeft: "0.5%",
  },
});

export default Header;
