import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const MainButton = () => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.text}>Xem tất cả</Text>
        </TouchableOpacity>
    )
}

export default MainButton

const styles = StyleSheet.create({
    button: {
        height: 40,
        borderRadius: 4,
        // padding: 5,
        backgroundColor: '#E1E1E1',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'System',
        fontSize: 13,
    },
})
