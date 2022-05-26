import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const ChatInputTheme = StyleSheet.create({
  container: {
    width: width,
    //height: 76.15,
    height: height * 0.046,
    backgroundColor: "white",
    justifyContent: "center",
  },
  innerTop: {
    flexDirection: "row",
  },
  input: {
    width: width * 0.9,
    marginLeft: 10,
  },
  textInput: {
    height: height * 0.034,
  },
  microButton: {
    marginLeft: 15,
    marginTop: 9,
    width: 12,
    height: 18,
  },
  innerBottom: {
    marginTop: height * 0.0061,
    flexDirection: "row",
    alignItems: "center",
  },
  leftButton: {
    flexDirection: "row",
    marginLeft: width * 0.032,
  },
  imgFolderButton: {
    width: 16,
    height: 16,
  },
  stikerButton: {
    width: 16,
    height: 16,
    marginLeft: width * 0.05,
  },
  atmButton: {
    width: 16,
    height: 16,
    marginLeft: width * 0.05,
  },
  actionButton: {
    width: 14,
    height: 14,
    marginLeft: width * 0.05,
  },
  rightButton: {
    marginLeft: width * 0.555,
  },
  optionButton: {
    width: 16.5,
    height: 4.5,
    margin: 4,
  },
});

export { ChatInputTheme };
