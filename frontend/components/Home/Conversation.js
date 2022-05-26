import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

const Conversation = () => {
    return (
      <View style= {styles.container}>
        <Text>Trò chuyện</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
});

export default Conversation;