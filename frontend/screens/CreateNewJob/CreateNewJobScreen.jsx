import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import NewJobHead from "../../components/CreateNewJob/NewJobHead";
import NewjobBody from "../../components/CreateNewJob/NewjobBody";

export default class CreateNewJobScreen extends Component {
  render() {
    return (
      <View>
        <NewJobHead />
        <NewjobBody />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
