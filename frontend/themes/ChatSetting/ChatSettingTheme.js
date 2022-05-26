import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const ChatSettingTheme = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: width * 0.0426666666666667,
        paddingLeft: width * 0.0426666666666667,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        backgroundColor: '#0D76C1',
    },
    imgBackgroundContainer: {
        flexDirection: 'row',
        marginTop: height * 0.0178571428571429,
        marginLeft: width * 0.0426666666666667,
        marginBottom: height * 0.0246305418719212,
    },
    textProfile: {
        fontFamily: 'System',
        fontSize: 16,
        lineHeight: 19,
        color: '#fff',
        marginLeft: width * 0.032,
        marginTop: height * 0.0036945812807882,
    },

    headerContainer: {
        marginTop: height * 0.0147783251231527,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: height * 0.0307881773399015,
    },
    avatar: {
        borderRadius: 100,
        width: 128,
        height: 121,
        overflow: 'hidden',
        position: 'relative',
    },
    imgCamera: {
        position: 'absolute',
        right: 120,
        top: 85,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 2,
        paddingRight: width * 0.0266666666666667,
        paddingLeft: width * 0.0266666666666667,
        paddingTop: height * 0.0123152709359606,
        paddingBottom: height * 0.0123152709359606,
        backgroundColor: '#E7E7E7',
        color: '#606060',
        borderRadius: 50,
        textAlign: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: height * 0.0073891625615764,
    },
    textInfo: {
        fontSize: 16,
        fontFamily: 'System',
        marginRight: width * 0.016,
        marginLeft: width * 0.032,
    },
    empty: {
        backgroundColor: '#F2F1F1',
    },
    otherContainer: {
        backgroundColor: '#fff',
    },

    setupOther: {
        fontFamily: 'System',
        fontSize: 18,
        lineHeight: 19,
        color: '#000000',
        marginTop: height * 0.0246305418719212,
    },
    hideContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
        borderStyle: 'solid',
    },
    hideText: {
        fontFamily: 'System',
        fontSize: 16,
        lineHeight: 19,
        color: '#797979',
        marginTop: height * 0.0246305418719212,
        marginBottom: height * 0.0123152709359606,
    },

    showContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
        borderStyle: 'solid',
    },
    showText: {
        fontFamily: 'System',
        fontSize: 16,
        lineHeight: 16,
        color: '#797979',
        marginTop: height * 0.0246305418719212,
    },
    changeImg: {
        fontFamily: 'System',
        fontSize: 16,
        lineHeight: 16,
        color: '#797979',
        marginTop: height * 0.0246305418719212,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
        borderStyle: 'solid',
        paddingBottom: 7,
    },
    outGroup: {
        fontFamily: 'System',
        fontSize: 16,
        lineHeight: 16,
        color: '#FF0000',
        marginBottom: height * 0.0246305418719212,
        marginTop: height * 0.0246305418719212,
    },
})

export { ChatSettingTheme }
