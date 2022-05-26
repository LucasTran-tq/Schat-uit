import { SET_PHONE_NUMBER, SET_ACCESS_TOKEN, SET_ID } from "../contants/auth.contant"

const initialState = {
    accessToken: '',
    phoneNumber1: '',
    id: '',
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
        default:
            return { ...state }
    }
}

export default userReducer
