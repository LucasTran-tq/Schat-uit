import React, { StatusBar, useState, useEffect, useCallback, useRef } from "react";
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
import { AntDesign } from '@expo/vector-icons'
// import DocumentPicker, { types } from "react-native-document-picker";
import ChatScreen from "../ScreenChatSingle/ChatScreen";
import io from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { LoadSocket, ListenFindUser, ListenNewRoom } from "../../store/actions/socket.action";

export default function CreateGroup({ navigation }) {
  const { id} = useSelector((state) => state.userReducer);
  const { socket, isListenFindUser, isListenNewRoom } = useSelector((state) => state.socketReducer);
  const { rooms } = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();

  const [dataRooms, setDataRooms] = useState([]);

  const addRoom = (newRoom) => setDataRooms(state => [...state, newRoom])
  

  const [Friend, SetFriend] = useState(dataRooms);
  const [RenderView, setRenderView] = useState(false);
  const [IdFriend, setIdFriend] = useState(0);
  const [Notification, setNotification] = useState(true);
  const [Search, setSearch] = useState("");
  const [SearchFriend, SetSearchFriend] = useState(Friend);

  const typingTimeoutRef = useRef(null)

  const [members, setMembers] = useState([]);
  const addMember = (newMember) => {
    if(newMember._id != id && members.indexOf(newMember) < 0)
            setMembers(state => [...state, newMember])        
  }
  
  const [messages, setMessages] = useState([]);


  const renderNotification = () => {
    if (Notification) return <View style={index.NodeNotificatio}></View>;
    else {
      return <></>;
    }
  };

  const createGroup = () => {
    console.log(members)
    if(members.length > 1){
      console.log(">1")
        if(isListenNewRoom){
          console.log("exist")
            dispatch(ListenNewRoom(false))
            socket.off("newRoom")
        }
        console.log("not exist")
        socket.on("newRoom", (data) => {
            console.log("/////////////////////////////////////////");
            console.log("data")
            console.log(data)
            const value = {
              id : data._id,
              avt: data.chat_room_image,
              name: data.chat_room_name,
              type: 1
          }
          dispatch(ListenNewRoom(true))
          navigation.navigate(
            'ChatScreen',
            value
            )        
        })
       
        let participants = []
        members.forEach(item => {
            participants.push(item._id)
        })
        let newGroup = {
            chat_room_name : "test2",
            chat_room_image : "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
            single_room: false,
            participants_id : participants
        }
        socket.emit('chatGroup', newGroup)
    }
    else{
        console.log("Paticipants > 1")
    }  
  }

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
            <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        // style={ChatHeaderTheme.imgBackgroundContainer}
                    >
                        <AntDesign name='left' size={24} color='#fff' />
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
            
                <View style={index.BoxPhoneBook}>
                <TouchableOpacity
                onPress={() => createGroup()}
                 >
                    <Image
                    source={require("../../assets/images/ListChat/add2.png")}
                    style={index.IconPhoneBook}
                    />
                    </TouchableOpacity>
                </View>
            <View>
            {(members!==null) 
            ?<FlatList
                data={members}
                horizontal = {true}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => renderMembers(item)}
            /> 
            : <Text>Không có dữ liệu</Text>}
            </View>
          </View>
        </View>
        <View style={index.MenuBody}>
          <Text>Bạn bè</Text>
          <Image
            source={require("../../assets/images/ListChat/list.png")}
            style={index.iconList}
          />
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

  

  const renderChatScreen = () => {
    return <ChatScreen />;
  };

  const renderFriend = () => {
    return (
      <View style={index.container}>
        {/* {renderHeaderFriend()}
                {renderContentFriend()}
                {renderFooterFriend()} */}
        {renderChatScreen()}
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

  const renderMembers = (item) => {
    return (
        <View style={index.ListBoxChat}>
          <View>
            {renderAvatar(item.chat_room_image)}
          </View>
          {/* <View>
            <Text>{item.chat_room_name}</Text>
            <Text>{item.last_message_content}</Text>
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
          </View> */}
        </View>
    );
  };


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
                    addMember(item) 
                    // console.log(item)                  
      }>
        <View style={index.ListBoxChat}>
          <View>
            {renderAvatar(item.chat_room_image)}
          </View>
          <View>
            <Text>{item.chat_room_name}</Text>
            <Text>{item.last_message_content}</Text>
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
    if (RenderView == false) {
      return (
        <View style={index.container}>
          {renderHeader()}
          {renderContent()}
        </View>
      );
    } else {
      if (RenderView == true) {
        return renderFriend();
      }
    }
  };
  return render();
}
