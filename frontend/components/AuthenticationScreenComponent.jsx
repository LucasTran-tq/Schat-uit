import React, { useRef, useState, useEffect } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Image,
} from 'react-native'

const AuthencationScreen = ({ navigation }) => {
    let textInput = useRef(null)
    const [phoneNumber, setPhoneNumber] = useState()
    const [focusInput, setFocusInput] = useState(true)
    const onChangePhone = (number) => {
        setPhoneNumber(number)
    }
    const onPressContinue = () => {
        if (phoneNumber) {
            navigation.navigate('InputOTPSigninScreenComponent')
        } else {
            alert('Vui lòng nhập số điện thoại')
        }
    }
    const onChangeFocus = () => {
        setFocusInput(true)
    }
    const onChangeBlur = () => {
        setFocusInput(false)
    }

    useEffect(() => {
        textInput.focus
    }, [])
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles.containerAvoidingView}
            >
                <View>
                    <Text style={styles.LoginText}>Đăng nhập</Text>
                    <Text>
                        Bạn mới dùng Schart?
                        <Text style={styles.SiginText}> Đăng Ký</Text>
                    </Text>
                </View>
                <View style={styles.Text}>
                    <Text style={styles.numberphone}>
                        Số điện thoại của bạn
                    </Text>
                </View>
                <View style={styles.CountryCode}>
                    <View style={styles.CodeVietNam}>
                        <Image
                            style={styles.LogoVietNam}
                            source={require('../assets/vietnam.png')}
                        ></Image>
                        <Text>{'  +84 '}</Text>
                        <Image
                            style={styles.LogoVietNam}
                            source={require('../assets/icons8-sort-down-7.png')}
                        ></Image>
                    </View>
                    <TextInput
                        style={styles.TextPhone}
                        ref={(input) => (textInput = input)}
                        placeholder=' Số điện thoại'
                        keyboardType='numeric'
                        value={phoneNumber}
                        onChangeText={onChangePhone}
                        secureTextEntry={false}
                        onFocus={onChangeFocus}
                        onBlur={onChangeBlur}
                    />
                </View>
                <View style={styles.InputContatiner}>
                    <TouchableOpacity
                        onPress={onPressContinue}
                        style={styles.btnLogin}
                    >
                        <Text style={styles.colorLogin}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvoidingView: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
    },
    LoginText: {
        width: 343,
        height: 27,
        marginTop: 97,
        fontFamily: 'System',
        fontSize: 23,
        fontWeight: '500',
        lineHeight: 27,
        color: '#131313',
        marginBottom: 10,
    },
    SiginText: {
        color: '#0D76C1',
    },
    numberphone: {
        marginTop: 55,
        marginBottom: 8,
    },
    /* NUMBER PHONE*/
    CountryCode: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: '#EEEEEE',
        height: 45,
    },
    CodeVietNam: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextPhone: {
        backgroundColor: 'white',
        width: 270,
        marginTop: 3,
        marginBottom: 3,
        marginLeft: 8,
        borderRadius: 2,
    },
    btnLogin: {
        fontFamily: 'System',
        fontSize: 15,
        fontWeight: '500',
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75,
        backgroundColor: '#27AAE1',
        borderRadius: 4,
    },
    colorLogin: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15,
    },
})

export default AuthencationScreen
