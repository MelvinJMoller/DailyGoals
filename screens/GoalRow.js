import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function GoalRow(props) {
    return (
      <View style={styles.row}>
        <Text style={styles.titleText}>{ props.goalData.key}</Text>
        {props.goalData.isdone &&
            <Text style={styles.doneText}>(Done)</Text>
        }
        <Button title='DONE' onPress={() => {
            props.goalChangeUppdate();
        }} />
        <Button title="DELETE" onPress={() => {
            props.goalDelete();
        }} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    row: {
      backgroundColor: "#eeeeee",
      flexDirection: "row",
      padding: 3,
      marginBottom: 10,
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#aaaaaa",
      
    },
    titleText: {
      paddingLeft: 5,
      fontSize: 20,
      color: "#152111"
    },
    doneText: {
      color: "#329e2c",
      paddingLeft: 3,
    },
  });