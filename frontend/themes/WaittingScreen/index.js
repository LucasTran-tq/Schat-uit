import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const index = StyleSheet.create({
    imgBack: {
        height: height,
        width: width,
        position: 'absolute',
    },
    imgfirstclass: {
        width: width,
        height: height * 0.58,
        position: 'absolute',
        tintColor: '#36b0e3',
    },
    imgsecondclass: {
        width: width,
        height: height * 0.55,
        position: 'absolute',
        tintColor: '#5ec0e9',
    },
    imgthirdclass: {
        width: width,
        height: height * 0.525,
        position: 'absolute',
    },
    container: {
        flex: 1,
        height: height * 0.5,
        width: width,
        alignItems: 'center',
    },
    imglogo: {
        width: width * 0.233,
        height: height * 0.048,
        marginTop: height * 0.045,
    },
    imgmaskgroup: {
        width: width,
        height: height * 0.38,
        marginTop: height * 0.016,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textfirst: {
        marginTop: height * 0.1,
        fontSize: height * 0.046,
        color: '#FFFFFF',
    },
    textsecond: {
        fontFamily: 'System',
        fontSize: height * 0.018,
        color: '#FFFFFF',
    },
    containerbutton: {
        height: height * 0.5,
        width: width,
        alignItems: 'center',
    },
    textthird: {
        marginTop: height * 0.085,
        marginBottom: 6,
        fontFamily: 'System',
        fontSize: 13,
        color: '#FFFFFF',
    },
    buttonlogin: {
        width: width * 0.912,
        height: height * 0.057, // cần xem lại
        backgroundColor: '#BEF7FF',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonlogout: {
        width: width * 0.912,
        height: height * 0.057, // cần xem lại
        marginTop: height * 0.0098,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#C0F7FF',
        backgroundColor: '#27aae1',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export { index }
