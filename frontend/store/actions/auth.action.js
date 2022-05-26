import { SET_PHONE_NUMBER, SET_ACCESS_TOKEN, SET_ID } from "../contants/auth.contant"
// import * as jwtRe from 'jsonwebtoken';

export const SetPhoneNumber = (phoneNumber) => {
    return {
        type: SET_PHONE_NUMBER,
        payload: phoneNumber
    }
}

export const SetAccessToken = (accessToken) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: accessToken
    }
}

export const SetIdUser = (idUser) => {
    return {
        type: SET_ID,
        payload: idUser
    }
}
