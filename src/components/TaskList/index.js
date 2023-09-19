import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function TaskList({ data, deleteItem, editItem }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => deleteItem(data.key)}>
        <Feather name="trash" color="#FFF" size={20} />
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => editItem(data)}>
          <Text style={styles.tarefa}>{data.nome}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#121212",
    color: "#FFF",
    marginHorizontal: 8,
    marginTop: 10,
    borderRadius: 5,
  },
  tarefa: {
    color: "#FFF",
    marginLeft: 10,
  },
});
