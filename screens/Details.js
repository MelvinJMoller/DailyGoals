import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Details({navigation, route}) {
    
    const [goalTitle, setGoalTitle] = useState(route.params.goalitem.key);
    const [errorMsg, setErrorMsg] = useState(" ");

    function saveChangeFunc() {
        if(goalTitle == " ") {
            setErrorMsg("Cannot save empty text!")
        } else {
            navigation.navigate({
                name: "Home",
                params: {goalName: goalTitle, rownum: route.params.rownum},
                merge: true
            })
        }
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.params.goalitem.key}</Text>
            <Text>Edit Title here:</Text>
            <TextInput value={goalTitle} onChangeText={setGoalTitle} style={styles.inputStyle} />
            <Button title='Save Changes' onPress={() => {
                saveChangeFunc();
            }} />
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eeeeee',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        marginBottom: 15,
        textDecorationLine: 'underline',
    },
    inputStyle: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        fontSize: 16,
        marginBottom: 10,
    }
  });