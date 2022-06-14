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
import axios from "axios";

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Video } from "expo-av";

import { useDispatch, useSelector } from "react-redux";
import { ListenChat, ListenNewMess } from "../../store/actions/socket.action";

const crypto = require("crypto-js");
var EC = require("elliptic-expo").ec;
var ec = new EC("curve25519");



const MessagesList = (props) => {
  const dispatch = useDispatch();
  const { accessToken, id, priKey } = useSelector((state) => state.userReducer);
  const { socket, isListenChat, isListenNewMess } = useSelector(
    (state) => state.socketReducer
  );
  const [messages, setMessages] = useState([]);
  const [emoji, setEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [heightValue, setHeightValue] = useState(new Animated.Value(70));
  const [image, setImage] = useState(null);
  const [hasData, setHasData] = useState(false)
  const [hasKey, setHasKey] = useState(false)
  // const [shareKey, setShareKey] = useState("")
  const addMessage = (newMessage) =>
    setMessages((state) => [...state, newMessage]);

  let length = 0;
  let idRoom = props.value.id;
  let shareKey = ""
  let baseURL = ""
  if(props.value.type == 1){
    baseURL = `http://localhost:3000/auth/blockchain/getPubKeyRoomId/` + props.value.id;
  }
  else {
    baseURL = `http://localhost:3000/auth/blockchain/getPubKeyUserID/` + props.value.id;
  }
  let uploadFileUrl = 'http://localhost:3000/chat/uploadFiles'
  let getFileUrl = 'http://localhost:3000/chat/getStaticFiles/'

  const myKey = ec.keyFromPrivate(priKey,"hex")


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

  function encrypt(text, password) {
    console.log("encrypt")
    var result = crypto.AES.encrypt(text, password);
    return result.toString();
  }

  function decrypt(enText, password) {
    console.log("decrypt")
    const result = crypto.AES.decrypt(enText, password);
    var textDecrypt = result.toString(crypto.enc.Utf8)
    return textDecrypt;
  }

  useEffect(() => {
    const getPub = async() => {
      await axios
        .get(baseURL, { headers: { Authorization: "Bearer " + accessToken } })
        .then((response) => {
          let key = ec.keyFromPublic(response.data.publicKey,"hex")
          shareKey = myKey.derive(key.getPublic()).toString()
          console.log("key")
          setHasKey(true)
        })
    }
    getPub();
  },[props.value.id])

  useEffect(() => {
    const fetchData = () => {
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
                  let nameFile = decrypt(item.message_content,shareKey);
                  // console.log(getFile(nameFile))
                  getFile(nameFile)
                  temp.image = "http://localhost:3000/decryptedFiles/"+nameFile
                  // temp.image = "" + getFile(nameFile)
                  break;
                case 4:
                  let nameVideo = decrypt(item.message_content,shareKey);
                  // console.log(getFile(nameFile))
                  getFile(nameVideo)
                  temp.video = "http://localhost:3000/decryptedFiles/"+nameVideo
                  break;
                default:
                  temp.text = decrypt(item.message_content,shareKey);
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
              let nameFile = decrypt(message.message_content,shareKey)
              getFile(nameFile)
              temp.image = "http://localhost:3000/decryptedFiles/"+nameFile
              break;
            case 4:
              let nameVideo = decrypt(message.message_content,shareKey);
              // console.log(getFile(nameFile))
              getFile(nameVideo)
              temp.video = "http://localhost:3000/decryptedFiles/"+nameVideo
              break;
            default:
              temp.text = decrypt(message.message_content,shareKey);
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
    if (!hasData && props.value.type == 2) {
      const newMes = {
        another_user_id: props.value.id,
        chat_message: {
          message_type: typeMes,
          message_content: encrypt(message, shareKey),
          chat_room_id: false,
        },
      };
      console.log(newMes);
      socket.emit("chatSingle", newMes);
    } else {
      const newMes = {
        message_type: typeMes,
        message_content: encrypt(message, shareKey),
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
    console.log("image")
    console.log(props.currentMessage)
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
    console.log("video")
    console.log(props.currentMessage)
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
        />
      </View>
    );
  }

  // const getFile = async(file) => {
  //   let path 
  //   console.log(file)
  //   await axios
  //     .get(getFileUrl+file)
  //     .then((response) => {
  //       console.log("res")
  //       console.log(response.data)
  //       if(response.data){
  //         path = response.data.path
  //       }
  //       else 
  //         path = "data:image/jpeg;base64,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"
  //     })
  //   }

    async function getFile(file) {
      let path 
      console.log(file)
      await axios
        .get(getFileUrl+file)
        .then((response) => {
          console.log("res")
          console.log(response.data)
          if(response.data){
            path = response.data.path
          }
          else 
            path = "data:image/jpeg;base64,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"
        })
    }

  // chon image de gui
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)

    if (!result.cancelled) {

      const uriParts = result.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const files = new FormData();
      files.append('files', {
        uri : result.uri,
        type: `image/${fileType}`,
        name: `photo.${fileType}`
      });

      fetch(uploadFileUrl, {
        method: 'POST',
        body: files,
        headers: {
          Accept: 'application/json',
          "Content-Type": "multipart/form-data"
        }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // console.log(data.files)
      // console.log(data.files.mimetype)
      if(data.files){
        if(data.files[0].mimetype == "image/jpeg"){
          console.log("type 3")
          onSend(data.files[0].filename,3)
        }
        else if(data.files[0].mimetype == "application/octet-stream"){
          console.log("type 4")
          onSend(data.files[0].filename,4)
        }
      }
      
    })
        .catch((err) => ("Error occured", err));
    }
  };

  const pickDocument = async () => {
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
