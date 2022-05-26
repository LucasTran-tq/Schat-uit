import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const DetailsTheme = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        // margin: '50%',
        // marginTop: '40%',
        marginVertical: '30%',
        marginHorizontal: 20,
        backgroundColor: '#ccc',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    screen: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        fontFamily: 'System',
        borderRadius: 10,
        position: 'relative',
    },

    currentProgress: {
        position: 'relative',
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#D3D3D3',
        borderStyle: 'solid',
        paddingBottom: 20,
    },
    currentUser: {
        marginTop: 20,
        paddingBottom: 20,
    },
    textProgress: {
        fontSize: 12,
        lineHeight: 14,
        color: '#919191',
        marginTop: 10,
    },
    textPercent: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#FA1919',
        color: '#fff',
        borderRadius: 50,
        marginLeft: 10,
        fontSize: 14,
        textAlign: 'center',
        marginTop: -10,
    },
    textContent: {
        color: '#000',
        borderRadius: 50,
        marginTop: 10,
        fontSize: 14,
    },

    textDesign: {
        color: '#27AAE1',
        marginTop: 10,
        fontSize: 14,
        // lineHeight: 16.41,
    },

    textStatus: {
        color: '#fff',
        marginTop: 10,
        fontSize: 14,
        backgroundColor: '#27AAE1',
        borderRadius: 50,
        marginLeft: 20,
        padding: 10,
        // height: 50,
        // width: '50%',
    },
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#D3D3D3',
        borderStyle: 'solid',
        paddingBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

        marginTop: 16,
        borderWidth: 0.7,
        borderColor: '#27AAE1',
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 10,
    },
    textUpfile: {
        color: '#27aae1',
        fontSize: 14,
        marginLeft: 5,
    },
    iconUpfile: { color: '#27aae1', transform: [{ rotate: '40deg' }] },
    textContainer: { flexDirection: 'row' },
    userContainer: {
        flexDirection: 'row',
        marginLeft: 30,
        alignItems: 'center',
        textAlign: 'center',
    },
    textUser: { marginRight: 12 },
    TienDo: {
        marginTop: 20,
        marginLeft: 10,
        flexDirection: 'row',
    },
    txtTiendo: {
        fontSize: 14,
        color: '#353535',
    },
    txtinputPer: {
        textAlign: 'center',
        fontSize: 14,
        color: '#353535',
        marginLeft: 12,
        borderWidth: 1,
        width: 48,
        height: 28,
        marginTop: -6,
        borderRadius: 8,
        borderColor: '#27AAE1',
    },
    txtPer: {
        fontSize: 14,
        color: '#353535',
        marginLeft: 10,
    },
    percentBar: {
        marginTop: 10,
        width: '40%',
    },
    pickerStyle: {
        height: 50,
        width: '60%',
        marginHorizontal: 10,
        marginTop: 7,
        color: 'red',
    },
})

export { DetailsTheme }
