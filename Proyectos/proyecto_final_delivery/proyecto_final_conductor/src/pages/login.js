import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    // ToastAndroid,
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import Model from "../Model";
import { setUser } from "../slices/navSlice";

const login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = (message) => {
        Model.user.login({ email: email, password: password }).then(r => {
            setEmail("");
            setPassword("");
            navigation.replace("root")
        }).catch(e => {
            alert("Datos Incorrectos" + JSON.stringify(e))
            // ToastAndroid.show("Datos Incorrectos" + e, ToastAndroid.LONG);
        })
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Text style={styles.title}>App Choferes</Text>
                </View>
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
                <Pressable style={styles.button} onPress={() => loginHandler()}>
                    <Text style={styles.text}>Iniciar</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.text}>Registrarse</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

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
export default login;
