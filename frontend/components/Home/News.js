import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

const News = () => {
    return (
      <View style= {styles.container}>
        <Text>Tin tức</Text>
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

export default News;