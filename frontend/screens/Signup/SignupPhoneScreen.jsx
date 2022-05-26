import { FontAwesome5 } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TouchableOpacity, View, Alert } from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import SigninScreenComponent from '../../components/Signin/SigninScreenComponent'
import { SignupPhoneTheme } from '../../themes/Signup/SignupPhoneTheme'

import { useDispatch, useSelector } from 'react-redux'
import { SetPhoneNumber } from '../../store/actions/auth.action'
import axios from 'axios'

const ScreenPhoneInput = ({ route, navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [Number, setNumber] = useState('')
    const [PhoneNumberError, setPhoneNumberError] = useState('')
    const MessageEro = ''
    const { firstName, lastName } = route.params

    const { phoneNumber1 } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    return (
        <View style={SignupPhoneTheme.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SignupNameScreen')
                }}
            >
                <FontAwesome5
                    name='arrow-left'
                    size={20}
                    style={SignupPhoneTheme.arrowLeftIcon}
                />
            </TouchableOpacity>

            <SigninScreenComponent />

            <View style={SignupPhoneTheme.boxSurname}>
                <Text style={SignupPhoneTheme.textLoginName}>
                    Số điện thoại của bạn
                </Text>
                <View style={SignupPhoneTheme.PhoneInput}>
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

            <View style={SignupPhoneTheme.PhoneMessageError}>
                {PhoneNumberError.length > 0 && (
                    <Text style={SignupPhoneTheme.textPhoneError}>
                        {PhoneNumberError}
                    </Text>
                )}
            </View>

            <View style={SignupPhoneTheme.boxNext}>
                <TouchableOpacity
                    style={SignupPhoneTheme.ButtonLoginNext}
                    onPress={async (MessageEro) => {
                        if (Number == '') {
                            setPhoneNumberError('Vui lòng nhập số điện thoại')
                        } else {
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
                                        'Vui lòng nhập đúng 9  chữ số, không bao gồm chữ số 0 ở đầu'
                                    )
                                } else {
                                    await axios
                                        .post(
                                            //'http://api.globalchain.vn:3000/auth/signup',
                                            'http://localhost:3000/auth/signup',
                                            {
                                                user_name:
                                                    firstName + ' ' + lastName,
                                                phone_number: phoneNumber,
                                            }
                                        )
                                        .then((response) => {
                                            console.log(response.data)
                                            dispatch(
                                                SetPhoneNumber(
                                                    response.data.data
                                                        .phoneNumber
                                                )
                                            )
                                            if (response.data.success) {
                                                navigation.navigate(
                                                    'InputOTPSignupScreenComponent',
                                                    response.data.data
                                                        .phoneNumber
                                                )
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                            Alert.alert(
                                                'Thông báo',
                                                error.response.data.message
                                            )
                                        })
                                }
                            }
                        }
                    }}
                >
                    <Text style={SignupPhoneTheme.appButtonTextCreate}>
                        Đăng ký
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScreenPhoneInput
