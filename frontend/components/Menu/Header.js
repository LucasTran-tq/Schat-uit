import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

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
        <TouchableOpacity onPress={() => navigation.navigate("ListChat")}>
          <Ionicons name="chevron-back-outline" size={26} color="white" />
        </TouchableOpacity>

        <Image
          style={styles.imgAcc}
          source={require("../../assets/ImageGsoft.png")}
          resizeMode="stretch"
        />

        <View style={styles.txtContainer}>
          <Text style={styles.txtName}>User</Text>
          <Text style={styles.txtTime}>Truy cập 2 giờ trước</Text>
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
    marginTop: "4%",
    marginLeft: "3%",
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
  },
  imgAcc: {
    width: 24,
    height: 24,
    marginHorizontal: "3%",
  },
  txtName: {
    marginTop: "12%",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19,
    color: "white",
  },
  txtTime: {
    fontSize: 10,
    fontWeight: "400",
    // lineHeight: 12,
    color: "white",
  },
});

export default Header;
