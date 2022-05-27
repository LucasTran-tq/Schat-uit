import { SET_PHONE_NUMBER, SET_ACCESS_TOKEN, SET_ID,SET_PRIVATE_KEY ,SET_PUBLIC_KEY, SET_LIST_KEY } from "../contants/auth.contant"

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

export const SetPrivatekey = (pri) => {
    return {
        type: SET_PRIVATE_KEY,
        payload: pri
    }
}

export const SetPublicKey = (pub) => {
    return {
        type: SET_PUBLIC_KEY,
        payload: pub
    }
}

export const SetListKey = (pub) => {
    return {
        type: SET_LISTKEY_KEY,
        payload: pub
    }
}
