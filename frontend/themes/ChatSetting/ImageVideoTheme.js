import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const ImageVideoTheme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: height * 0.0233990147783251,
        paddingLeft: width * 0.0453333333333333,
        paddingBottom: height * 0.0197044334975369,
        paddingRight: width * 0.0453333333333333,
    },
})

export { ImageVideoTheme }
