import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import SignupSuccessComponent from '../../components/Signup/SignUpSuccessComponent'
import { FontAwesome5 } from '@expo/vector-icons'
import { Formik } from 'formik'
import { SignupSchema } from '../../validation'
import { SignupNameTheme } from '../../themes/Signup/SignupNameTheme'

// const crypto = require("crypto-js");
// import Base64 from 'crypto-js/enc-base64';
// var EC = require("elliptic-expo").ec;
// var ec = new EC("curve25519");

function SignupSuccessScreen({ navigation }) {

    // useEffect(() => {
    //     console.log("in use effect");
    //     var key1 = ec.genKeyPair();
    //     var hex = key1.getPublic("hex")
    //     console.log(typeof hex)
    //     console.log(hex)
    //     var key2 = ec.keyFromPublic(hex,"hex")
    //     console.log("key2")
    //     console.log(key2)
    //   }, []);
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
