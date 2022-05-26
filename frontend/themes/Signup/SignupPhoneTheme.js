import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const SignupPhoneTheme = StyleSheet.create({
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
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    View: {
        flex: 6,
        backgroundColor: 'white',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    imageGD: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        // marginTop: 100,
    },
    Image: {
        flex: 1,
        resizeMode: 'stretch',
        width: '100%',
        // height:"100%",
        marginTop: 80,
    },
    logo: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 25,
    },
    bot: {
        flex: 5,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    dk: {
        alignItems: 'center',
    },
    textHello: {
        fontFamily: 'System',
        fontSize: 35,
        textAlign: 'center',
        marginTop: 20,
        color: '#ffffff',
    },
    textLogin: {
        fontFamily: 'System',
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
    },
    textSChat: {
        fontFamily: 'System',
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
    },
    button: {
        marginTop: 20,
        width: '100%',
        padding: 10,
    },
    buttonLogin: {
        width: 500,
        marginLeft: 50,
        marginRight: 50,
        padding: 10,
        borderRadius: 16,
    },
    buttonCreate: {
        width: 500,
        marginLeft: 50,
        marginRight: 50,
        padding: 10,
        borderRadius: 16,
    },
    text: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        color: '#2196F3',
    },
    appButtonContainerLogin: {
        elevation: 8,
        backgroundColor: '#BEF7FF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    appButtonTextLogin: {
        fontSize: 18,
        color: '#0D76C1',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
    appButtonContainerCreate: {
        elevation: 8,
        backgroundColor: '#27AAE1',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: '#ffffff',
        //borderRadius:50,
        borderWidth: 1,
        marginVertical: 15,
    },
    appButtonTextCreate: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
        //textTransform: "uppercase",
    },

    //Login
    containerCreate: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: 'white',
    },
    ViewBox: {
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between',
    },
    BoxOTP: {
        backgroundColor: '#FDFDFD',
        borderRadius: 10,
        borderColor: '#131313',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        marginVertical: 15,
        //margin:10,
        height: 60,
        width: 60,
    },
    inputSurname: {
        backgroundColor: '#FDFDFD',
        borderRadius: 10,
        borderColor: '#131313',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        marginVertical: 15,
        margin: 20,
    },
    inputName: {
        backgroundColor: '#FDFDFD',
        borderRadius: 10,
        borderColor: '#131313',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        marginVertical: 15,
        margin: 20,
    },
    textLoginName: {
        fontSize: 15,
        fontFamily: 'System',
        marginLeft: 20,
        marginTop: 20,
        color: '#5F5D5D',
        marginBottom: 9,
    },
    ButtonLoginNext: {
        elevation: 8,
        backgroundColor: '#27AAE1',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: '#ffffff',
        //borderRadius:50,
        borderWidth: 1,
        marginVertical: 15,
        margin: 20,
    },
    titleLogin: {
        //flex:1,
        marginTop: 50,
        margin: 20,
    },
    boxSurname: {},
    boxName: {},
    boxNext: {},
    titleCreate: {
        fontFamily: 'System',
        fontSize: 23,
        //textAlign: "center",
        marginTop: 30,
        color: '#131313',
        fontWeight: 'bold',
    },
    textTitle: {
        fontSize: 15,
        color: '#7B7B7B',
        fontFamily: 'System',
    },
    textTitleLogin: {
        fontSize: 15,
        color: '#27AAE1',
        fontFamily: 'System',
    },
    textBack: {
        fontSize: 20,
        //ontFamily:"arial",
    },

    containerLogin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    ButtonLoginText: {
        fontSize: 15,
        color: '#27AAE1',
    },
    textName: {
        fontSize: 26,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 20,
        color: '#353535',
    },
    PhoneMessageError: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    textPhoneError: {
        fontSize: 15,
        color: '#FF2121',
        fontFamily: 'System',
    },
    PhoneInput: {
        marginLeft: 20,
        marginRight: 20,
        //padding:"center",
        justifyContent: 'center',
    },
    iconBack: {
        // width:50,
        // height:50,
        // backgroundColor:"white"
    },
})

export { SignupPhoneTheme }
