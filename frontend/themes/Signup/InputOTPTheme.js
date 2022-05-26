import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const InputOTPTheme = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
    },
    arrowLeftIcon: {
        color: '#000',
        width: 20,
        height: 26,
        marginTop: 58,
    },

    containerAvoidingView: {
        flex: 1,
        // marginLeft: 16,
        // marginRight: 16,
    },
    /* TEXT OTP*/
    OTPText: {
        width: 343,
        height: 27,
        marginTop: 29,
        fontFamily: 'System',
        fontSize: 23,
        fontWeight: '500',
        lineHeight: 27,
        color: '#131313',
        marginBottom: 8,
    },
    InputOTPText: {
        color: '#7B7B7B',
    },
    /* CODE OTP */
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 76,
    },
    /*CODE OTP */
    InputBox: {
        backgroundColor: 'white',
        fontWeight: '500',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 17,
        height: 52.7,
        width: 52.7,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D7D7D7',
    },
    boxRed: {
        color: 'red',
        fontSize: 15,

        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        marginBottom: 6,
    },
    /*BUTTON CONFIRM */
    btnConfirm: {
        fontFamily: 'System',
        fontSize: 15,
        fontWeight: '500',
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27AAE1',
        borderRadius: 4,
    },
    colorConfirm: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15,
    },
    timer: {
        fontFamily: 'System',
        fontSize: 15,
        lineHeight: 18,
        alignItems: 'center',
        textAlign: 'center',
        color: '#48A4D5',
        margin: 32,
    },
})

export { InputOTPTheme }
