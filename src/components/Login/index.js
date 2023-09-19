import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import firebase from "../../services/firebaseConnection";

export default function Login({ changeStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPasswprd] = useState("");
  const [type, setType] = useState("login");

  function handleLogin() {
    if (type === "login") {
      const user = firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid);
        })
        .catch((error) => {
          alert("Ops, algo deu errado!", error);
          return;
        });
    } else {
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid);
        })
        .catch((error) => {
          alert("Erro", error);
          return;
        });
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Seu email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="*********"
        secureTextEntry={true}
        onChangeText={(text) => setPasswprd(text)}
        value={password}
      />

      <TouchableOpacity
        style={[
          styles.areaBtn,
          { backgroundColor: type === "login" ? "#3EA6F2" : "#141414" },
        ]}
        onPress={handleLogin}
      >
        <Text style={{ color: "#FFF", fontSize: 17 }}>
          {type === "login" ? "Acessar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "#F2F6FC" }}
        onPress={() => setType(type === "login" ? "cadastrar" : "login")}
      >
        <Text style={{ color: "#121212", textAlign: "center" }}>
          {type === "login" ? "Criar uma conta" : "Já possuo uma conta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#F2F6FC",
    paddingHorizontal: 10,
  },
  input: {
    height: 45,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: "#FFF",
    color: "#121212",
  },
  areaBtn: {
    alignItems: "center",
    height: 40,
    backgroundColor: "#121212",
    justifyContent: "center",
    marginBottom: 10,
  },
});
