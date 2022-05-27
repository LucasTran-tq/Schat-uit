import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native'
import { useState, useRef } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'

import { InputOTPTheme } from '../../themes/Signin/InputOTPTheme'

import { useDispatch, useSelector } from 'react-redux'
import { SetAccessToken, SetIdUser } from "../../store/actions/auth.action";
import axios from "axios"

const InputOTPSigninScreenComponent = ({ route, navigation }) => {
    const pin1ref = useRef()
    const pin2ref = useRef()
    const pin3ref = useRef()
    const pin4ref = useRef()
    const pin5ref = useRef()
    const pin6ref = useRef()

    const [OTPError, setOTPError] = useState('')

    const [Number1, setNumber1] = useState('')
    const [Number2, setNumber2] = useState('')
    const [Number3, setNumber3] = useState('')
    const [Number4, setNumber4] = useState('')
    const [Number5, setNumber5] = useState('')
    const [Number6, setNumber6] = useState('')

    const { phoneNumber } = route.params

    const {phoneNumber1} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    return (
        <View style={InputOTPTheme.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SignupPhoneScreen', route.params)
                }}
            >
                <FontAwesome5
                    name='arrow-left'
                    size={20}
                    style={InputOTPTheme.arrowLeftIcon}
                />
            </TouchableOpacity>

            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={InputOTPTheme.containerAvoidingView}
            >
                <View style={InputOTPTheme.OTPTextContainer}>
                    <Text style={InputOTPTheme.OTPText}>Xác nhận OTP</Text>
                    <Text style={InputOTPTheme.InputOTPText}>
                        Nhập mã OTP để tiếp tục
                    </Text>
                </View>

                <View style={InputOTPTheme.containerInput}>
                    <TextInput
                        style={InputOTPTheme.InputBox}
                        autoFocus={true}
                        value={Number1}
                        onChangeText={(text) => {
                            setNumber1(text)
                            if (isFinite(text) == true && text != '') {
                                pin1ref.current.focus()
                            } else {
                                setNumber1('')
                            }
                        }}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        keyboardType='numeric'
                        maxLength={1}
                    />
                    <TextInput
                        ref={pin1ref}
                        style={InputOTPTheme.InputBox}
                        keyboardType='numeric'
                        maxLength={1}
                        value={Number2}
                        onChangeText={(text) => {
                            setNumber2(text)
                            if (isFinite(text) == true && text != '') {
                                pin2ref.current.focus()
                            } else {
                                setNumber2('')
                            }
                        }}
                        returnKeyType='next'
                        blurOnSubmit={false}
                    />
                    <TextInput
                        ref={pin2ref}
                        style={InputOTPTheme.InputBox}
                        keyboardType='numeric'
                        maxLength={1}
                        value={Number3}
                        onChangeText={(text) => {
                            setNumber3(text)
                            if (isFinite(text) == true && text != '') {
                                pin3ref.current.focus()
                            } else {
                                setNumber3('')
                            }
                        }}
                        returnKeyType='next'
                        blurOnSubmit={false}
                    />
                    <TextInput
                        ref={pin3ref}
                        style={InputOTPTheme.InputBox}
                        keyboardType='numeric'
                        maxLength={1}
                        value={Number4}
                        onChangeText={(text) => {
                            setNumber4(text)
                            if (isFinite(text) == true && text != '') {
                                pin4ref.current.focus()
                            } else {
                                setNumber4('')
                            }
                        }}
                        returnKeyType='next'
                        blurOnSubmit={false}
                    />
                    <TextInput
                        ref={pin4ref}
                        style={InputOTPTheme.InputBox}
                        keyboardType='numeric'
                        maxLength={1}
                        value={Number5}
                        onChangeText={(text) => {
                            setNumber5(text)
                            if (isFinite(text) == true && text != '') {
                                pin5ref.current.focus()
                            } else {
                                setNumber5('')
                            }
                        }}
                        returnKeyType='next'
                        blurOnSubmit={false}
                    />
                    <TextInput
                        ref={pin5ref}
                        style={InputOTPTheme.InputBox}
                        keyboardType='numeric'
                        maxLength={1}
                        value={Number6}
                        onChangeText={(text) => {
                            setNumber6(text)
                            if (isFinite(text) == true && text != '') {
                                //
                                requireSms()
                            } else {
                                setNumber6('')
                            }
                        }}
                        returnKeyType='done'
                        blurOnSubmit={false}
                    />
                </View>
                <View>
                    {OTPError.length > 0 && (
                        <Text style={InputOTPTheme.boxRed}>{OTPError}</Text>
                    )}
                </View>

                <Text style={InputOTPTheme.timer}>Còn 02:00s</Text>

                <View style={InputOTPTheme.ConfirmContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            if (
                                Number1 == '' ||
                                Number2 == '' ||
                                Number3 == '' ||
                                Number4 == '' ||
                                Number5 == '' ||
                                Number6 == ''
                            ) {
                                setOTPError('Vui lòng nhập đủ 6 số')
                            } else {
                                setOTPError('')
                                requireSms()
                            }
                        }}
                        style={InputOTPTheme.btnConfirm}
                    >
                        <Text style={InputOTPTheme.colorConfirm}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )

    async function requireSms() {
        let otp = Number1 + Number2 + Number3 + Number4 + Number5 + Number6
        if (otp.length !== 6) return
        await axios
                    .post( 
                       // 'http://api.globalchain.vn:3000/auth/sms-verification',
                       'http://10.45.235.96:3000/auth/sms-verification',
                         {
                    otp: Number(otp),
                    phone_number: phoneNumber1,
                })
                .then(response => {
                    console.log(response.data)
                    if (response.data.success) {
                        dispatch(SetAccessToken(response.data.data.accessToken))
                        dispatch(SetIdUser(response.data.data.user_id))
                        SecureStore.setItemAsync(
                            'accessToken',
                            response.data.data.accessToken
                        )
                        SecureStore.setItemAsync(
                            'idUser',
                            response.data.data.user_id
                        )
                        navigation.navigate('ListChat')
                    }
                })
                .catch(error => {
                    console.log(typeof otp)
                    console.log(error.response.data.message)
                    Alert.alert(
                        'Thông báo',
                        error.response.data.message
                    )
                });
    }
}

export default InputOTPSigninScreenComponent
