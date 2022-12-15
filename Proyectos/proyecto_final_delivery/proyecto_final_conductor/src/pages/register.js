import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const fetchRegister = () => {
    fetch("http://apimoviles2.jmacboy.com/api/choferes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.user_id) {
          navigation.navigate("Login");
          showToast();
          setName("");
          setLastName("");
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("Error: "+ error, ToastAndroid.LONG);
      });
  };
  const showToast = () => {
    ToastAndroid.show("Usuario Registrado", ToastAndroid.LONG);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>REGISTRARSE</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Apellido"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Correo"
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Contraseña"
        />
        <Pressable style={styles.button} onPress={() => fetchRegister()}>
          <Text style={styles.text}>Registrarse</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.text}>Cancelar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    marginVertical: 12,
    padding: 10,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "black",
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
