import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import moment from 'moment';
import { index } from "../../themes/ListChat/index";
// import DocumentPicker, { types } from "react-native-document-picker";
import ChatScreen from "../ScreenChatSingle/ChatScreen";
import io from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { LoadSocket, ListenFindUser } from "../../store/actions/socket.action";

export default function ListChat({ navigation }) {
  const { accessToken, id} = useSelector((state) => state.userReducer);
  const { socket, isListenFindUser } = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();


  const [dataRooms, setDataRooms] = useState([]);
  const [isBusy, setIsBusy] = useState(true)

  const addRoom = (newRoom) => setDataRooms(state => [...state, newRoom])
  useEffect(() => {
    try {
      if(socket==null)
      {
        console.log("///Listchat")
        console.log("null")
        const socket1 = io(
          //"http://api.globalchain.vn:3000/chat",
          "http://localhost:3000/chat",
        {
          extraHeaders: {
            Authorization: "Bearer " + accessToken,
          },
        });    
      //   socket1.of()
        dispatch(LoadSocket(socket1))
        socket1.on("lastMessages", (rooms) => {
          if(rooms.length >= 1){
            console.log("data")
          }
          else{
            console.log("null")
          }
          console.log( moment()) 
          // console.log(rooms);
          setDataRooms([])
          // setDataRooms(rooms);
          try{
            rooms.forEach((item) => {   
              if(item.chat_room.single_room){
                item.chat_room.participants.forEach((user) => {   
                  let message_content = ""
                  let time = ""
                  var oneHour=1000 * 60 * 60
                  var now = moment()
                  var last_message_time = moment(item.last_message.message_time)
                  var difference_ms = Math.abs(now - last_message_time)
                  var diffValue = Math.round(difference_ms / oneHour);         
                  if(diffValue<24){
                    time = diffValue + " giờ"
                  }
                  else{
                    diffValue=Math.round(diffValue/24)
                    time = diffValue + " ngày"
                  }
                  if(item.last_message.user._id == id){
                    message_content = "Bạn: " + item.last_message.message_content.slice(0,30)
                  }
                  else{
                    message_content = item.last_message.message_content.slice(0,30)
                  }
                  if(user._id != id){              
                    const temp = {
                      _id: item.chat_room._id,
                      chat_room_image: user.avatar,
                      chat_room_name: user.user_name,
                      last_message_content: message_content,
                      last_message_time: time,
                      type: 1 //room
                    }      
                    addRoom(temp)
                  }
                });
              }
              else{
                let message_content = ""
                  let time = ""
                  var oneHour=1000 * 60 * 60
                  var now = moment()
                  var last_message_time = moment(item.last_message.message_time)
                  var difference_ms = Math.abs(now - last_message_time)
                  var diffValue = Math.round(difference_ms / oneHour);         
                  if(diffValue<24){
                    time = diffValue + " giờ"
                  }
                  else{
                    diffValue=Math.round(diffValue/24)
                    time = diffValue + " ngày"
                  }
                  if(item.last_message.user._id == id){
                    message_content = "Bạn: " + item.last_message.message_content.slice(0,30)
                  }
                  else{
                    message_content = item.last_message.message_content.slice(0,30)
                  }
                  const temp = {
                    _id: item.chat_room._id,
                    chat_room_image: item.chat_room.chat_room_image[0],
                    chat_room_name: item.chat_room.chat_room_name,
                    last_message_content: message_content,
                    last_message_time: time,
                    type: 1 //room
                  }      
                  // console.log(temp)
                  addRoom(temp)
              }
            });
            console.log( moment()) 
            console.log("///success")  
          }catch(error){
            console.log(error)
          }     
        });
        setIsBusy(false)
      }   
    if(socket && isBusy) {    
      console.log("///Listchat")
      console.log("exist") 
      socket.emit("getListRoomForUser", id )
      setIsBusy(false)
    }             
    } catch (error) {
      console.log("Fail to fetch room list", error);
    }
  }, [navigation]);

  // all Event:
// join room and get all message: Event name: joinRoom -> Listener: showAllChatOnRoom
// connection, get all room -> Listener: chatRooms

  const [Friend, SetFriend] = useState(dataRooms);
  const [RenderView, setRenderView] = useState(false);
  const [Notification, setNotification] = useState(true);
  const [Search, setSearch] = useState("");

  const [messages, setMessages] = useState([]);

  const typingTimeoutRef = useRef(null)

  const renderNotification = () => {
    if (Notification) return <View style={index.NodeNotificatio}></View>;
    else {
      return <></>;
    }
  };

  const filterSearch = (text) => {
    setSearch(text) 
    console.log(text)
    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current);
    }     
    typingTimeoutRef.current = setTimeout(() => {
        if(text){   
          if(isListenFindUser){
            dispatch(ListenFindUser(false))
            socket.off("getUserByPhone")
          }
          socket.on("getUserByPhone", (users) => {
            console.log("\\\\\\\\\\\\\"")   
            console.log(users)    
            setDataRooms([])
            if(typeof users != "string"){
              const temp = {
                _id: users._id,
                chat_room_image: users.avatar,
                chat_room_name: users.user_name,
                type: 2, //user
              }
              addRoom(temp)
            }      
            dispatch(ListenFindUser(true))
          })
          let number = ''
          if(text.indexOf("0") == 0){
            number = '+84' +  text.slice(1, text.length)
          }
          socket.emit("searchUserByPhone", number)
        }
        else{
          console.log("null")
          socket.emit("getListRoomForUser", id )
        }
    }, 500)
  };


  const renderHeader = () => {
    return (
      <View style={index.Header}>
        <ImageBackground
          source={require("../../assets/images/ListChat/MaskGroup.png")}
          style={index.ImageBackground}
        >
          <View style={index.BoxTop}>
            <TouchableOpacity onPress={() => navigation.navigate("MenuScreen")}>
              <View style={index.BoxAvatar}>
                <Image
                  source={require("../../assets/images/ListChat/avatar.png")}
                  style={index.avatar}
                />
              </View>
            </TouchableOpacity>

            <View style={index.BoxSearch}>
              <TextInput
                placeholder="Tìm kiếm bạn bè, nhóm"
                style={index.search}
                selectionColor={"#1E73B9"}
                value={Search}
                onChangeText={(text) => filterSearch(text)}
              ></TextInput>
            </View>
            <View style={index.BoxAdd}>
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Image
                  source={require("../../assets/images/ListChat/IconNews.png")}
                  style={index.IconNews}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("CreateGroup")}
              >
                <View>
                  <Image
                    source={require("../../assets/images/ListChat/add2.png")}
                    style={index.IconNotification}
                  />
                  {/* {renderNotification()} */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={index.Content}>
        <View>
          <View style={index.PhoneBook}>
            <View>
              <View style={index.BoxPhoneBook}>
                
                 <TouchableOpacity
                onPress={() => (console.log(dataRooms))}
              >
                <Image
                  source={require("../../assets/images/ListChat/Phonebook.png")}
                  style={index.IconPhoneBook}
                />
              </TouchableOpacity>
              </View>
    
            </View>
            <View>
              <Text>Danh bạ</Text>
            </View>
          </View>
        </View>
        <View style={index.MenuBody}>
          <Text>Tất cả tin nhắn</Text>
          <Image
            source={require("../../assets/images/ListChat/list.png")}
            style={index.iconList}
          />
          <Text>Chưa đọc</Text>
        </View>

        <View style={index.listFriend}>
          {(dataRooms!==null) 
          ?<FlatList
            data={dataRooms}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => renderItem(item)}
          /> 
          : <Text>Không có dữ liệu</Text>}
        </View>
      </View>
    );
  };

  const UnreadMessage = (item) => {
    if (item.UnreadMessage > 0) {
      return (
        <View style={index.Node}>
          <Text style={index.NumberNode}>{item.UnreadMessage}</Text>
        </View>
      );
    } else {
      return <></>;
    }
  };

  const Silent = (item) => {
    if (item.silent == true) {
      return (
        <Image
          source={require("../../assets/images/ListChat/Silent.png")}
          style={index.IconSilent}
        />
      );
    } else {
      return <></>;
    }
  };

  //new
  const renderAvatar = (url) => {
    if (typeof url === 'string') {
      return (
        <Image
          source={{ uri: url }}
          style={index.IconAvatar}
        />
      )
    } else if (typeof url === 'number') {
      return (
        <Image
          source={url}
          style={index.IconAvatar}
        />
      )
    }
  }
  ///// các room trong list chat
  const renderItem = (item) => {
    const value = {
        id : item._id,
        avt: item.chat_room_image,
        name: item.chat_room_name,
        type: item.type
    }
    return (
      <TouchableOpacity onPress={() => 

                    {
                      console.log( moment())
                      navigation.navigate(
                        'ChatScreen',
                        value
                    )
                    
                  }
      }>
        <View style={index.ListBoxChat}>
          <View>
            {renderAvatar(item.chat_room_image)}
          </View>
          <View>
            <Text style={index.ChatRoomName}>{item.chat_room_name}</Text>
            <Text style={index.LastMessage}>{item.last_message_content}</Text>
          </View>
          <View style={index.TextTime}>
            <View style={index.BoxTime}>
              <View>{UnreadMessage(item)}</View>
              <View style={index.BoxTextTime}>
                <View style={index.TimeChat}>
                  <Text>{item.last_message_time}</Text>
                </View>
                <View style={index.BoxSilent}>{Silent(item)}</View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const render = () => {
    return (
      <View style={index.container}>
        {renderHeader()}
        {renderContent()}
      </View>
    );
  };
  return render();
}
