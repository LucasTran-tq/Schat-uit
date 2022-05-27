import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  LogBox,
  SafeAreaView,
  ActivityIndicator,
  Container,
  Image,
} from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { Ionicons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Video } from "expo-av";

import { useDispatch, useSelector } from "react-redux";
import { ListenChat, ListenNewMess } from "../../store/actions/socket.action";

const MessagesList = (props) => {
  const { id } = useSelector((state) => state.userReducer);
  const { socket, isListenChat, isListenNewMess } = useSelector(
    (state) => state.socketReducer
  );
  const [messages, setMessages] = useState([]);
  let length = 0;
  let idRoom = props.value.id;
  const dispatch = useDispatch();

  const [emoji, setEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [heightValue, setHeightValue] = useState(new Animated.Value(70));
  const [image, setImage] = useState(null);
  const [hasData, setHasData] = useState(false)

  const addMessage = (newMessage) =>
    setMessages((state) => [...state, newMessage]);

  useEffect(() => {
    showEmojis();
  }, [showEmojiPicker]);

  const showEmojis = () => {
    Animated.timing(heightValue, {
      toValue: showEmojiPicker ? 300 : 30,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    // alo()
    const fetchData = async () => {
      try {
        if (isListenChat) {
          console.log("Off");
          dispatch(ListenChat(false));
          socket.off("showAllChatOnRoom");
        }
        socket.on("showAllChatOnRoom", (data) => {
          console.log("/////////////////////////////////////////");
          console.log("show all");
          // console.log(data)
          // console.log(typeof data)
          if (typeof data != "string" && data.length > 0) {
            console.log("exist data");
            setHasData(true)
            length = data.length;
            idRoom = data[0].chat_room._id;

            data.forEach((item) => {
              const temp = {
                _id: item._id,
                createdAt: item.message_time,
                user: {
                  _id: item.user?._id,
                  name: item.user?.user_name,
                  avatar: item.user?.avatar,
                },
              };
              switch (item.message_type) {
                case 3:
                  temp.image = 'http://localhost:3000/streaming-file/get-file/' + item.message_content;
                  break;
                case 4:
                  temp.video = item.message_content;
                  break;
                default:
                  temp.text = item.message_content;
              }
              addMessage(temp);
            });
          } else {
            console.log("string");
            setMessages([]);
          }

          dispatch(ListenChat(true));
        });

        if (isListenNewMess) {
          dispatch(ListenNewMess(false));
          socket.off("messageClient");
        }
        socket.on("messageClient", (message) => {
          idRoom = message.chat_room._id;
          setHasData(true)
          length++;
          console.log("new mes 11111");
          const temp = {
            _id: message._id,
            createdAt: message.message_time,
            user: {
              _id: message.user._id,
              name: message.user.user_name,
              avatar: message.user.avatar,
            },
          };

          switch (message.message_type) {
            case 3:
              temp.image = 'http://localhost:3000/streaming-file/get-file/' + message.message_content;
              console.log(temp.image);
              break;
            case 4:
              temp.video = message.message_content;
              break;
            default:
              temp.text = message.message_content;
          }
          addMessage(temp);
          dispatch(ListenNewMess(true));
        });
        //type 1: room || type 2: user
        if (props.value.type == 1) {
          console.log("room");
          socket.emit("joinRoom", props.value.id);
        } else {
          console.log("user");
          socket.emit("singleRoom", props.value.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  
  const onSend = useCallback((message = [],typeMes = 0) => {
    console.log(message)
    if (hasData && props.value.type == 2) {
      const newMes = {
        another_user_id: props.value.id,
        chat_message: {
          message_type: typeMes,
          message_content: message,
          chat_room_id: false,
        },
      };
      console.log(newMes);
      socket.emit("chatSingle", newMes);
    } else {
      const newMes = {
        message_type: typeMes,
        message_content: message,
        chat_room_id: idRoom,
      };
      console.log(newMes);
      socket.emit("sendMessage", newMes);
    }
  }, []);

  //style send btn
  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.btnSend}>
          <Ionicons name="send-sharp" size={25} color="black" />
        </View>
      </Send>
    );
  }

  const renderMessageImage = (props) => {
    return (
      <View
        style={{
          borderRadius: 15,
          padding: 2,
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            width: 200,
            height: 200,
            padding: 6,
            borderRadius: 15,
            resizeMode: "cover",
          }}
          source={{ uri: props.currentMessage.image }}
        />
      </View>
    );
  };

  function renderMessageVideo(props) {
    // console.log(props.currentMessage.video)
    return (
      <View>
        <Video
          // ref={video}
          style={styles.video}
          source={{
            uri: props.currentMessage.video,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
    );
  }

  // chon image de gui
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Image:", result);

    if (!result.cancelled) {
      setImage(result.uri);
      const fileToBase64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // const extfileName = result.name.split(".").pop();
      const checkType = result.type == "video" ? 4 : 3;
      const mesContent = result.type + ";base64;" + fileToBase64;
      console.log("length: " + length)
      console.log("type: " + props.value.type)
      console.log("data: " + hasData)
      onSend(mesContent,checkType)
    }
  };

  const pickDocument = async () => {
    console.log("length: " + length)
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        base64: true,
      });

      const fileToBase64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const extfileName = result.name.split(".").pop();
      const checkType = extfileName == "mp4" ? 4 : 3;
      const mesContent = result.name + ";base64;" + fileToBase64;
      console.log("length: " + length)
      console.log("type: " + props.value.type)
      console.log("data: " + hasData)
      onSend(mesContent,checkType)
    } catch (err) {
      console.log(err);
    }
  };

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. ",
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.giftedChat}>
        <GiftedChat
          messages={messages}
          inverted={false}
          renderAvatarOnTop={true}
          onSend={(messages) => {
            onSend(messages[0].text,2), setEmoji("");
          }}
          user={{
            _id: id,
          }}
          placeholder="Nhập tin nhắn của bạn..."
          renderSend={renderSend}
          renderMessageVideo={renderMessageVideo}
          renderMessageImage={renderMessageImage}
          text={emoji}
          onInputTextChanged={(text) => setEmoji(text)}
          bottomOffset={33}
          renderLoading={renderLoading}
        />
      </View>
      <Animated.View style={[{ height: heightValue }, styles.buttonContainer]}>
        <View style={styles.innerContainer}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons name="image-outline" size={19} color="#292929" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowEmojiPicker((value) => !value)}
            >
              <Entypo
                name={showEmojiPicker ? "cross" : "emoji-happy"}
                size={18}
                color="#292929"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={pickDocument}>
              <Entypo name="attachment" size={18} color="#292929" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color="#292929" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="mic-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.rightContainer}>
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-sharp"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.emojiContainer}>
          <EmojiSelector
            onEmojiSelected={(curentEmoji) => {
              setEmoji(emoji + curentEmoji);
            }}
            showSearchBar={false}
            showTabs={true}
            showHistory={true}
            showSectionTitles={true}
            columns="9"
            category={Categories.all}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  giftedChat: {
    flex: 1,
  },
  btnSend: {
    justifyContent: "center",
    height: "100%",
    marginRight: 10,
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "white",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    marginLeft: 12,
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightContainer: {
    marginRight: 12,
  },
  emojiContainer: {
    width: "100%",
    height: "100%",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
});

export default MessagesList;
