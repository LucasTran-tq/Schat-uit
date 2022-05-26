import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";

const Body = () => {
  const typeNotification = ["Tất cả thông báo", "Thông báo mới", "Đã xem"];
  const [data, setData] = useState([
    {
      id: "1",
      title: "Nguyễn react to your message",
      message: "Hello Úc Nhỏ",
      avatar: require("../../assets/images/ListChat/avatar/HaMy.png"),
      icon: require("../../assets/images/Icon/Heart.png"),
    },
    {
      id: "2",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/KenNguyen.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "3",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/Khaly.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "4",
      title: "Nguyễn react to your message",
      message: "Hello Úc Nhỏ",
      avatar: require("../../assets/images/ListChat/avatar/Mary.png"),
      icon: require("../../assets/images/Icon/Heart.png"),
    },
    {
      id: "5",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/KenNguyen.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "6",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/Khaly.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "7",
      title: "Nguyễn react to your message",
      message: "Hello Úc Nhỏ",
      avatar: require("../../assets/images/ListChat/avatar/HaMy.png"),
      icon: require("../../assets/images/Icon/Heart.png"),
    },
    {
      id: "8",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/KenNguyen.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "9",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/Khaly.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "10",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/Khaly.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "11",
      title: "Nguyễn react to your message",
      message: "Hello Úc Nhỏ",
      avatar: require("../../assets/images/ListChat/avatar/HaMy.png"),
      icon: require("../../assets/images/Icon/Heart.png"),
    },
    {
      id: "12",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/KenNguyen.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "13",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/Khaly.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "14",
      title: "Nguyễn react to your message",
      message: "Hello Úc Nhỏ",
      avatar: require("../../assets/images/ListChat/avatar/HaMy.png"),
      icon: require("../../assets/images/Icon/Heart.png"),
    },
    {
      id: "15",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/KenNguyen.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
    {
      id: "16",
      title: "Ken Nguyen react to your message",
      message: "You: Bạn đang nghĩ gì?",
      avatar: require("../../assets/images/ListChat/avatar/Khaly.png"),
      icon: require("../../assets/images/Icon/Like.png"),
    },
  ]);
  //change color
  const [changeColor, setChangeColor] = useState("#F2FBFF");
  const changeBackground = () => {
    let color = "white";
    setChangeColor(color);
  };

  //format data
  const renderItem = (item) => {
    return (
      <TouchableOpacity>
        <View style={styles.notificationContainer}>
          <View style={styles.notification}>
            <View style={styles.left}>
              <Image style={styles.imgAcc} source={item.avatar} />
              <View style={styles.text}>
                <Text style={styles.txtTitle}>{item.title}</Text>
                <Text style={styles.txtMessage}>{item.message}</Text>
              </View>
            </View>

            <View style={styles.right}>
              <Image
                style={styles.imgIcon}
                source={item.icon}
                resizeMode="stretch"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          data={typeNotification}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"Tất cả thông báo"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <Ionicons
                name={isOpened ? "caret-up" : "caret-down"}
                color={"#9B9B9B"}
                size={16}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />

        <TouchableOpacity style={styles.btnSeenAll} onPress={changeBackground}>
          <Text style={styles.seenAllTxt}>Đánh dấu đã đọc tất cả</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[styles.listNotifications, { backgroundColor: changeColor }]}
      >
        {/* renderdata ra màn hình */}
        <FlatList
          data={data}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listNotifications: {
    flex: 1,
    backgroundColor: "#F2FBFF",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  imgAcc: {
    width: 33,
    height: 33,
    borderRadius: 100,
  },
  notificationContainer: {
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  notification: {
    marginVertical: 8,
    marginHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
  txtTitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  txtMessage: {
    fontSize: 12,
    lineHeight: 13,
    color: "#A9A9A9",
  },
  imgIcon: {
    height: 9,
    width: 10,
  },
  right: {
    justifyContent: "center",
  },
  dropdownContainer: {
    width: "100%",
    height: "6%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdown1BtnStyle: {
    width: "40%",
    backgroundColor: null,
  },
  dropdown1BtnTxtStyle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "left",
  },
  dropdown1DropdownStyle: {
    borderRadius: 8,
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    fontSize: 16,
  },
  btnSeenAll: {
    width: "45%",
    height: "75%",
    marginRight: "3%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default Body;
