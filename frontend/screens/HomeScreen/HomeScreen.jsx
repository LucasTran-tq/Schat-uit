import React from 'react'
import { StyleSheet, View } from 'react-native'
import BottomTabNavigation from '../../navigation/BottomTabNavigation'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <BottomTabNavigation />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default HomeScreen
