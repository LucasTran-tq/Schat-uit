import { FontAwesome5 } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TouchableOpacity, View, Alert } from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import SignupScreenComponent from '../../components/Signup/SignupScreenComponent'
import { SigninScreenTheme } from '../../themes/Signin/SigninScreenTheme'

import * as SecureStore from 'expo-secure-store'

import { useDispatch, useSelector } from 'react-redux';
import { SetPhoneNumber } from "../../store/actions/auth.action";
import axios from "axios";

const ScreenPhoneInput = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [Number, setNumber] = useState('')
    const [PhoneNumberError, setPhoneNumberError] = useState('')
    const MessageEro = ''

    const {phoneNumber1} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    return (
        <View style={SigninScreenTheme.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('WaittingScreen')
                    // navigation.navigate('SecureStoreApp')
                }}
            >
                <FontAwesome5
                    name='arrow-left'
                    size={20}
                    style={SigninScreenTheme.arrowLeftIcon}
                />
            </TouchableOpacity>

            <SignupScreenComponent />

            <View style={SigninScreenTheme.boxSurname}>
                <Text style={SigninScreenTheme.textLoginName}>
                    Số điện thoại của bạn
                </Text>
                <View style={SigninScreenTheme.PhoneInput}>
                    <PhoneInput
                        defaultValue={phoneNumber}
                        defaultCode='VN'
                        onChangeText={(text) => {
                            setNumber(text)
                        }}
                        onChangeFormattedText={(text) => {
                            setPhoneNumber(text)
                        }}
                    />
                </View>
            </View>

            <View style={SigninScreenTheme.PhoneMessageError}>
                {PhoneNumberError.length > 0 && (
                    <Text style={SigninScreenTheme.textPhoneError}>
                        {PhoneNumberError}
                    </Text>
                )}
            </View>

            <View style={SigninScreenTheme.boxNext}>
                <TouchableOpacity
                    style={SigninScreenTheme.ButtonLoginNext}
                    onPress={async (MessageEro) => {
                        if (Number == '') {
                            setPhoneNumberError('Vui lòng nhập số điện thoại')
                        } else {
                            await SecureStore.setItemAsync(
                                'phoneNumber',
                                phoneNumber
                            )
                            if (
                                Number.includes('.') == true ||
                                isFinite(Number) == false
                            ) {
                                setPhoneNumberError(
                                    'Vui lòng không nhập ký tự đặc biệt'
                                )
                            } else {
                                if (Number.length != 9) {
                                    setPhoneNumberError(
                                        'Vui lòng nhập đúng 9 chữ số, không bao gồm chữ số 0 ở đầu'
                                    )
                                } else {
                                    await axios
                                    .post(
                                       // 'http://api.globalchain.vn:3000/auth/login', 
                                       'http://172.20.1.36:3000/auth/login', 
                                    {
                                        phone_number: phoneNumber,
                                    })
                                    .then(response => {
                                        console.log(response.data )
                                        dispatch(SetPhoneNumber(response.data.data.phoneNumber))
                                        if (response.data.success) {
                                            navigation.navigate(
                                                'InputOTPSigninScreenComponent',
                                                response.data.data.phoneNumber 
                                            )
                                        }
                                    })
                                    .catch(error => {
                                        console.log("error : " + error)
                                        Alert.alert(
                                            'Thông báo',
                                            error.response.data.message
                                        )
                                    });
                                }
                            }
                        }
                    }}
                >
                    <Text style={SigninScreenTheme.appButtonTextCreate}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScreenPhoneInput
