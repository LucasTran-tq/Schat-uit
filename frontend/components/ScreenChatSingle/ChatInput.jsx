import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ChatInputTheme } from "../../themes/ScreenChatSingle/ChatInputTheme";
import { useNavigation } from "@react-navigation/native";

const ChatInput = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={ChatInputTheme.container}>
      <View style={ChatInputTheme.innerBottom}>
        <View style={ChatInputTheme.leftButton}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={ChatInputTheme.imgFolderButton}
              source={require("../../assets/images/ChatSingle/ImageFolder.png")}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={ChatInputTheme.stikerButton}
              source={require("../../assets/images/ChatSingle/Stiker.png")}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={ChatInputTheme.atmButton}
              source={require("../../assets/images/ChatSingle/Attachments.png")}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={ChatInputTheme.actionButton}
              source={require("../../assets/images/ChatSingle/Action.png")}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View style={ChatInputTheme.rightButton}>
          <TouchableOpacity>
            <Image
              style={ChatInputTheme.optionButton}
              source={require("../../assets/images/ChatSingle/Option.png")}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={() => {navigation.navigate('ImagePickerScreen')}}> */}
      </View>
    </View>
  );
};

export default ChatInput;
