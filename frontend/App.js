import { useFonts } from "expo-font";

import StackNavigation from "./navigation/StackNavigation";

import { Provider } from "react-redux";
import { Store } from "./store/store";
// import ListChat from './screens/ListChat/ListChat.jsx'

export default function App() {
  // const [loaded] = useFonts({
  //   "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  //   "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
  //   "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }

  return (
    <Provider store={Store}>
      <StackNavigation />
    </Provider>
  );
}
