import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GoalRow from './GoalRow';

export default function Home({navigation, route}) {

    const [addGoal, setAddGoal] = useState("");
    const [goalData, setGoalData] = useState([]);
    //const [goalData, setGoalData] = useState([ {key: "TESTITEMDEFAULT", isdone: false}, {key: "TESTDONE", isdone: true} ]);
    const [errorMsg, setErrorMsg] = useState("");
    var [defaultNumberOfGoals, setDefaultNumberOfGoals] = useState(0)
    var [numberMsg, setNumberMsg] = useState("You have "+defaultNumberOfGoals+" DAILYGOALS!");

    useEffect(() => {
        if(route.params?.goalName) {
            const newList = [...goalData];
            newList[route.params.rownum].key = route.params.goalName;
            setGoalData(newList);
        }
    }, [route.params?.goalName]);

    function funcCountEntries(version) {
        var count = Object.entries(goalData).length;
        if (version == "add") {
            count++;
        } else {
            count--;
        }
        console.log("Count "+count);
        setNumberMsg("You have "+count+" DAILYGOALS!");
    }

    function listAdd() {
        if(addGoal != "") {
            const newGoalData = goalData.concat({key: addGoal});
            setGoalData(newGoalData);
            setErrorMsg("");
            funcCountEntries("add");
        } else {
            setErrorMsg("You have not entered something!")
        }
    }

    function funcDone(number) {
        const newList = [...goalData];
        if(newList[number].isdone == true) {
            newList[number].isdone = false;
        } else {
            newList[number].isdone = true;
        }
        setGoalData(newList);
    }

    function deleteFunc(number) {
        const newListS = [...goalData].slice(0, number);
        const newListE = [...goalData].slice(number + 1);
        const newList = newListS.concat(newListE);
        setGoalData(newList);
        funcCountEntries("del");
    }

    return (
      <View style={styles.container}>
        {errorMsg != "" &&
            <Text style={styles.errorStyle}>{errorMsg}</Text>
        }
        <Text style={styles.counter}>{numberMsg}</Text>
        <TextInput value={addGoal} onChangeText={setAddGoal} placeholder='What is your goal:' style={styles.styleInput}/>
        <Button title="Add" onPress={() => {
            listAdd();
        }}/>
        <FlatList 
            data={goalData}
            renderItem={({item, index}) => 
            <TouchableOpacity onPress={() => {
                navigation.push("Details", {goalitem: item, rownum: index});
            }}>
                <GoalRow goalData={item} goalChangeUppdate={() => {
                    funcDone(index);
                }}
                goalDelete={() => {
                    deleteFunc(index);
                }} />
            </TouchableOpacity>
        }
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eaffe3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorStyle: {
        backgroundColor: "#f75c5c",
        borderWidth: 1,
        fontSize: 20,
        padding: 3,
    },
    counter: {
        backgroundColor: "#b0ff94",
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
        padding: 3,
    },
    styleInput: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        fontSize: 16,
        marginBottom: 10,
    },

  });