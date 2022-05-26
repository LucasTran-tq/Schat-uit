import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const NewJobHeadTheme = StyleSheet.create({
  container: {
    backgroundColor: "#27AAE1",
    height: 74,
    width: "100%",
  },
  iconBack: {
    marginTop: 47.08,
    marginLeft: 16.5,
  },
  txtTaoCongViecMoi: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 40,
    marginLeft: 12,
    fontWeight: "bold",
  },
  iconSearch: {
    marginTop: 43,
    marginLeft: 162,
  },
  iconOption: {
    marginTop: 43,
    marginLeft: 12,
  },
});

export { NewJobHeadTheme };
