import { StyleSheet } from "react-native";
const index = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    //flexDirection: "column",
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
  },
  Header: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#27AAE1",
  },
  BoxTop: {
    height: "100%",
    marginTop: "2%",
    marginHorizontal: "3%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Content: {
    width: "100%",
    flex: 9,
    backgroundColor: "#FFFFFF",
  },
  Footer: {
    width: "100%",
    flex: 1,
    backgroundColor: "red",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  IconBot: {
    marginTop: 10,
    marginBottom: 5,
  },
  avatar: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  iconSearch: {
    marginHorizontal: "4%",
  },
  search: {
    width: "80%",
    marginLeft: 10
  },
  BoxAvatar: {},
  BoxSearch: {
    width: "72%",
    height: 26,
    borderRadius: 100,
    position: "relative",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  BoxAdd: {
    flexDirection: "row",
  },
  IconNews: {
    //flex:1
    margin: 5,
    width: 20,
    height: 16,
  },
  IconNotification: {
    //flex:1
    margin: 5,
    // width: 16,
    // height: 20,
  },
  BoxPhoneBook: {
    backgroundColor: "#5DA452",
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  IconPhoneBook: {
    width: 25,
    height: 25,
  },
  PhoneBook: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
  },

  BoxChat: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  BoxNews: {
    alignItems: "center",
    justifyContent: "center",
  },
  BoxAction: {
    alignItems: "center",
    justifyContent: "center",
  },
  BoxNotification: {
    alignItems: "center",
    justifyContent: "center",
  },
  BoxMenu: {
    alignItems: "center",
    justifyContent: "center",
  },
  TextBoxBot: {
    fontSize: 12,
    //fontFamily:""
    //marginBottom:2,
  },
  IconBot: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  MenuBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  iconList: {},
  ListBoxChat: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
  },
  IconAvatar: {
    backgroundColor: "#1E73B9",
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  ChatRoomName: {
    fontSize: 15,
    fontWeight: "500"
  },
  LastMessage: {
    fontSize: 13,
    fontWeight: "400",
    color: "#A9A9A9"
  },
  IconLogo: {
    width: 30,
    height: 30,
  },

  listFriend: {
    //backgroundColor: "red",
    flex: 1,
  },

  TextTime: {
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    flex: 1,
  },
  BoxTime: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    //backgroundColor: "red",
  },
  BoxTextTime: {
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
    //backgroundColor:"red",
    flexDirection: "column",
  },
  Node: {
    borderRadius: 100,
    backgroundColor: "red",
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  NumberNode: {
    fontSize: 10,
  },
  IconSilent: {
    width: 12,
    height: 14,
  },
  TimeChat: {
    flex: 1,
  },
  BoxSilent: {
    flex: 1,
    //backgroundColor:"#FFFFFF"
  },
  NodeNotificatio: {
    borderRadius: 100,
    backgroundColor: "red",
    width: 8,
    height: 8,
    // justifyContent:"center",
    // alignItems:"center",
    position: "absolute",
    top: 5,
    right: 5,
  },

  FooterFriend: {
    width: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerFriend: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    //flexDirection: "column",
  },
  BoxIcon: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    //borderBottomColor:"red",
  },
  IconCall: {
    margin: 5,
    width: 16,
    height: 16,
  },
  VideoCall: {
    margin: 5,
    width: 26,
    height: 16,
  },
  Seting: {
    margin: 5,
    width: 16,
    height: 12,
  },
  ContentFriend: {
    width: "100%",
    flex: 9,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  NameFriend: {
    fontSize: 15,
    marginTop: 20,
  },
  icon: {
    margin: 5,
    width: 16,
    height: 16,
  },
  iconMic: {
    margin: 5,
    width: 11,
    height: 16,
  },
  iconExtend: {
    margin: 5,
    width: 22,
    height: 5,
  },
  textChat: {
    width: "95%",
    margin: 10,
  },
  BoxInputChat: {
    width: "100%",
  },
  FooterIcon: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  FooterIconLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  FooterIconRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
export { index };
