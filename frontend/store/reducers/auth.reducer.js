import { SET_PHONE_NUMBER, SET_ACCESS_TOKEN, SET_ID, SET_PRIVATE_KEY ,SET_PUBLIC_KEY, SET_LIST_KEY } from "../contants/auth.contant"

const initialState = {
    accessToken: '',
    phoneNumber1: '',
    id: '',
    priKey: '',
    pubKey: '',
    listKey: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHONE_NUMBER:
            state.phoneNumber1 = action.payload;
            return { ...state }
        case SET_ACCESS_TOKEN:
            state.accessToken = action.payload;
            return { ...state }
        case SET_ID:
            state.id = action.payload;
            return { ...state }
        case SET_PRIVATE_KEY:
            state.priKey = action.payload;
            return { ...state }
        case SET_PUBLIC_KEY:
            state.pubKey = action.payload;
            return { ...state }
        case SET_LIST_KEY:
            state.pubKey = {...action.payload};
            return { ...state }
        default:
            return { ...state }
    }
}

export default userReducer
