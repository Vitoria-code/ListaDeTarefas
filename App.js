import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";
import firebase from "./src/services/firebaseConnection";

import Feather from "react-native-vector-icons/Feather";

export default function listaDeTarefas() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    function getUser() {
      if (!user) {
        return;
      }

      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .once("value", (snapshot) => {
          setTasks([]);

          snapshot?.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
            };

            setTasks((oldTasks) => [...oldTasks, data]);
          });
        });
    }

    getUser();
  }, [user]);

  function handleAdd() {
    if (newTask === "") {
      return;
    }

    if (key !== "") {
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .child(key)
        .update({
          nome: newTask,
        })
        .then(() => {
          const taskIndex = tasks.findIndex((item) => item.key === key);
          const taskClone = tasks;
          taskClone[taskIndex].nome = newTask;

          setTasks([...taskClone]);
        });
      Keyboard.dismiss();
      setNewTask("");
      setKey("");
      return;
    }

    let tarefas = firebase.database().ref("tarefas").child(user);
    let chave = tarefas.push().key;

    tarefas
      .child(chave)
      .set({
        nome: newTask,
      })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask,
        };
        setTasks((oldTasks) => [...oldTasks, data]);
      });

    Keyboard.dismiss();
    setNewTask("");
  }

  function handleDelete(key) {
    firebase
      .database()
      .ref("tarefas")
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTasks = tasks.filter((item) => item.key !== key);
        setTasks(findTasks);
      });
  }

  function handleEdit(item) {
    setKey(item.key);
    setNewTask(item.nome);
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey("");
    setNewTask("");
    Keyboard.dismiss();
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  return (
    <View style={styles.container}>
      {key.length > 0 && (
        <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 8 }}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name="x-circle" size={20} color="#FF0000" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, color: "#FF0000" }}>
            Você está editando uma tarefa
          </Text>
        </View>
      )}

      <View style={styles.areaTask}>
        <TextInput
          placeholder="O que vai fazer hoje?"
          style={styles.input}
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />

        <TouchableOpacity style={styles.areaBtn} onPress={handleAdd}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  areaTask: {
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: "90%",
  },
  areaBtn: {
    backgroundColor: "#121212",
    width: 40,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    color: "#FFF",
  },
  btnText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 22,
  },
});
