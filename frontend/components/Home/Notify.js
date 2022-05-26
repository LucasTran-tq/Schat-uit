import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

const Notify = () => {
    return (
      <View style= {styles.container}>
        <Text>thông báo</Text>
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

export default Notify;