import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import SignupSuccessComponent from '../../components/Signup/SignUpSuccessComponent'
import { FontAwesome5 } from '@expo/vector-icons'
import { SignupNameTheme } from '../../themes/Signup/SignupNameTheme'
import { useDispatch, useSelector } from "react-redux";
import { SetPrivatekey, SetPublicKey } from '../../store/actions/auth.action'
import * as SecureStore from 'expo-secure-store'
import axios from "axios";

// const crypto = require("crypto-js");
var EC = require("elliptic-expo").ec;
var ec = new EC("curve25519");

function SignupSuccessScreen({ navigation }) {
    const dispatch = useDispatch();
    const { accessToken} = useSelector((state) => state.userReducer);

    useEffect(() => {
        console.log("in use effect");
        var key1 = ec.genKeyPair();
        var pri = key1.getPrivate("hex")
        var pub = key1.getPublic("hex")
        SecureStore.setItemAsync(
            'pri',
            pri
        )
        dispatch(SetPrivatekey(pri))

        axios.post('http://localhost:3000/auth/blockchain/createNewPub', {
            publicKey: pub
          }, {
            headers: {
              'Authorization': `Basic ${accessToken}` 
            }
          })

      }, []);
    return (
        <View style={SignupNameTheme.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('InputOTPSignupScreenComponent')
                }}
            >
                <FontAwesome5
                    name='arrow-left'
                    size={20}
                    style={SignupNameTheme.arrowLeftIcon}
                />
            </TouchableOpacity>

            <SignupSuccessComponent />

            <View style={SignupNameTheme.buttonContainer}>
                <Button
                    title='Đăng nhập'
                    sytle={SignupNameTheme.button}
                    onPress={() =>
                        navigation.navigate(
                            'ListChat',
                        )
                    }
                />
            </View>
        </View>
    )
}

export default SignupSuccessScreen
