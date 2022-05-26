import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const SignupNameTheme = StyleSheet.create({
    container: {
        fontFamily: 'System',
        marginRight: 16,
        marginLeft: 16,
    },
    arrowLeftIcon: {
        color: '#000',
        width: 20,
        height: 26,
        marginTop: 58,
    },
    firstName: {
        width: 90,
        height: 15,
        marginTop: 47,
        fontSize: 13,
        lineHeight: 15,
        alignItems: 'center',
        color: '#404040',
    },
    firstNameInput: {
        height: 38,
        marginTop: 8,
        backgroundColor: '#FDFDFD',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 4,
        paddingTop: 8,
        paddingLeft: 13,
        paddingBottom: 10,
    },
    lastName: {
        marginTop: 16,
        // width: 30,
        height: 15,
        fontSize: 13,
        lineHeight: 15,
        alignItems: 'center',
        color: '#404040',
    },
    lastNameInput: {
        height: 38,
        marginTop: 8,
        fontSize: 13,
        lineHeight: 15,
        color: '#404040',
        backgroundColor: '#FDFDFD',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 4,
        paddingTop: 8,
        paddingLeft: 13,
        paddingBottom: 10,
    },
    buttonContainer: {
        marginTop: 32,
    },
    button: {
        backgroundColor: '#27AAE1',
        borderRadius: 4,
        fontFamily: 'System',
        fontSize: 15,
        lineHeight: 18,
    },
    message: {
        color: 'red',
    },
})

export { SignupNameTheme }
