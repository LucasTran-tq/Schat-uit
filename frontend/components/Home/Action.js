import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../Action/Header'
import ItemList from '../Action/ItemList'
import Body from '../Action/Body'

const Action = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ItemList />
            <Body />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Action
