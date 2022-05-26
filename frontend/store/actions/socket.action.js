import { LOAD_ROOMS, LOAD_MESSAGES, LOAD_SOCKET, IS_LISTEN_CHAT, IS_LISTEN_NEW_MESS, IS_LISTEN_FIND_USER ,LOAD_SOCKET_TASK } from "../contants/socket.contant"

export const LoadChatRooms = (rooms) => {
    return {
        type: LOAD_ROOMS,
        payload: rooms
    }
}

export const LoadMessages = (messages) => {
    return {
        type: LOAD_MESSAGES,
        payload: messages
    }
}

export const LoadSocket= (socket) => {
    console.log("Init socket")
    return {
        type: LOAD_SOCKET,
        payload: socket
    }
}

export const ListenChat= (bool) => {
    console.log("Listen chat")
    return {
        type: IS_LISTEN_CHAT,
        payload: bool
    }
}

export const ListenNewMess= (bool) => {
    console.log("Listen new mess")
    return {
        type: IS_LISTEN_NEW_MESS,
        payload: bool
    }
}

export const ListenFindUser= (bool) => {
    console.log("Listen find user")
    return {
        type: IS_LISTEN_FIND_USER,
        payload: bool
    }
}

export const LoadSocketTask= (socket) => {
    console.log("Init socket task")
    return {
        type: LOAD_SOCKET_TASK,
        payload: socket
    }
}







