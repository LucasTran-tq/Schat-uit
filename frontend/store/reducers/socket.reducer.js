import { LOAD_ROOMS, LOAD_MESSAGES, LOAD_SOCKET, IS_LISTEN_CHAT, IS_LISTEN_NEW_MESS, IS_LISTEN_FIND_USER, IS_LISTEN_NEW_ROOM, LOAD_SOCKET_TASK } from "../contants/socket.contant"

const initialState = {
    rooms: [],
    messages: [],
    socket: null,
    isListenChat: false,
    isListenNewMess: false,
    isListenFindUser: false,
    socketTask: null,
    isListenNewRoom: false,
}

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ROOMS:
            state.rooms = [...action.payload];
            return { ...state }
        case LOAD_MESSAGES:
            state.messages = [...action.payload];
            return { ...state }
        case LOAD_SOCKET:
            state.socket = action.payload
            return { ...state }
        case IS_LISTEN_CHAT:
            state.isListenChat = action.payload
            return { ...state }
        case IS_LISTEN_NEW_MESS:
            state.isListenNewMess = action.payload
            return { ...state }
        case IS_LISTEN_FIND_USER:
            state.isListenFindUser = action.payload
            return { ...state }
        case LOAD_SOCKET_TASK:
            state.socketTask = action.payload
            return { ...state }
        case IS_LISTEN_NEW_ROOM:
            state.isListenNewRoom = action.payload
            return { ...state }
        default:
            return { ...state }
    }
}

export default socketReducer