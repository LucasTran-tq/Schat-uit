import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const LinksTheme = StyleSheet.create({
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
        marginBottom: height * 0.0086206896551724,
    },
    img: {
        marginRight: 9,
    },
    text: {
        fontFamily: 'System',
        width: 269.27,
        // height: 34,
        fontSize: 12,
        lineHeight: 14,
        color: '#48A4D5',
    },
})

export { LinksTheme }
