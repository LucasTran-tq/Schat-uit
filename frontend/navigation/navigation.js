import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./BottomTabNavigation";
import StackNavigation from "./navigation/StackNavigation";
import TabNavigation from "./navigation/TabNavigation";

export default function NestedNavigaiton() {
  return (
    <NavigationContainer>
      <StackNavigation />
      <TabNavigation />
      <BottomTabNavigation />
    </NavigationContainer>
  );
}
