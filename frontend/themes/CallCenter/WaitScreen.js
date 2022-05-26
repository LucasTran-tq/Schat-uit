import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const WaitScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#27AAE1',
    },
    zoomButton: {
        width: 40,
        height: 40,
        marginTop: height * 0.061576354679803,
        marginLeft: width * 0.0426666666666667,
        borderStyle: 'solid',
        borderColor: '#1E73B9',
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: '#1E73B9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        marginTop: height * 0.0369458128078818,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    textHeader: {
        marginTop: height * 0.0369458128078818,
        fontFamily: 'System',
        width: 174,
        height: 44,
        fontSize: 18,
        lineHeight: 21,
        color: '#F2F1F1',
        textAlign: 'center',
    },
    bodyContainer: {
        flexDirection: 'row',
    },
    textBody: {
        position: 'relative',
        width: 218,
        height: 18,
        fontFamily: 'System',
        fontSize: 15,
        lineHeight: 16,
        alignItems: 'center',
        textAlign: 'center',
        color: '#C0F7FF',
    },
    iconContainerLeft: {
        position: 'absolute',
        right: 200,
        bottom: 3,
        flexDirection: 'row',
    },
    iconContainerRight: {
        position: 'absolute',
        left: 200,
        bottom: 3,
        flexDirection: 'row',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        marginTop: height * 0.1231527093596059,
    },

    volume: {
        width: 74,

        height: 70,
        color: '#fff',
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        paddingTop: height * 0.0320197044334975,

        textAlign: 'center',
    },

    microphone: {
        width: 74,
        height: 70,
        color: '#fff',
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        paddingTop: height * 0.0320197044334975,

        textAlign: 'center',
    },

    phoneContainer: {
        marginTop: height * 0.0862068965517241,
        alignItems: 'center',
    },
    phone: {
        width: 74,
        height: 70,
        color: '#1E73B9',
        borderStyle: 'solid',
        borderColor: '#27AAE1',

        borderWidth: 1,
        borderRadius: 100,
        paddingTop: height * 0.0320197044334975,
        textAlign: 'center',
        backgroundColor: '#fff',
        position: 'relative',
    },

    phoneHangup: {
        width: 74,
        height: 70,
        color: '#FA1919',
        borderStyle: 'solid',
        borderColor: '#1E73B9',

        borderWidth: 1,
        borderRadius: 100,
        paddingTop: height * 0.0320197044334975,
        // paddingBottom: height * 0.0246305418719212,
        // paddingRight: width * 0.0533333333333333,
        // paddingLeft: width * 0.0533333333333333,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    animation: {
        position: 'absolute',
    },
})

export { WaitScreen }
