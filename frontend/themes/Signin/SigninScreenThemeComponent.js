import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const SigninScreenThemeComponent = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    arrowLeftIcon: {
        color: '#000',
        width: 20,
        height: 26,
        marginTop: 58,
    },
    text: {
        width: 343,
        height: 27,
        fontSize: 23,
        fontFamily: 'System',
        lineHeight: 27,
        alignItems: 'flex-end',
        color: '#131313',
        marginTop: 29,
    },
    paragraph: {
        marginTop: 12,
        fontFamily: 'System',
        fontSize: 15,
        lineHeight: 18,
        color: '#7B7B7B',
    },
    signin: {
        color: '#339af0',
        paddingLeft: 8,
        paddingTop: 10,
    },
})

export { SigninScreenThemeComponent }
