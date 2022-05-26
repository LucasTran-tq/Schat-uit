import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const FilesTheme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: height * 0.0233990147783251,
        paddingLeft: width * 0.0453333333333333,
        paddingBottom: height * 0.0197044334975369,
        paddingRight: width * 0.0453333333333333,
        maxHeight: 247,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: height * 0.0110837438423645,
    },
    img: {
        marginRight: width * 0.024,
    },
    text: {
        width: 271,
        height: 17,
        fontFamily: 'System',
        fontSize: 12,
        lineHeight: 14,
        color: '#212121',
    },
    paragraph: {
        width: 271,
        height: 17,
        fontFamily: 'System',
        fontSize: 10,
        lineHeight: 12,
        color: '#A9A9A9',
    },
})

export { FilesTheme }
