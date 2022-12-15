import { AsyncStorage } from "react-native";
import Config from "../../Config";

export default class user {
    email: string;
    password: string;
    access_token: string;
    chofer: number;


    static getLogeado() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem("user").then((e) => {
                if (!e) {
                    reject("No user loged");
                    return;
                }
                var usr = JSON.parse(e);
                resolve(usr);
            }).catch((e) => {
                reject(e);
            })

        })
        return
    }
    static setLogeado(obj) {
        return AsyncStorage.setItem("user", JSON.stringify(obj));
    }
    static closeSession() {
        return AsyncStorage.removeItem("user");
    }
    static login(user: { email: string, password: string }) {
        return new Promise((resolve, reject) => {
            fetch(`${Config.API}/login`, {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json", },
                body: JSON.stringify(user),
            }).then((response) => response.json())
                .then((json) => {
                    if (!json.message) {
                        this.setLogeado(json)
                        resolve(json)
                    } else {
                        reject(json)
                    }
                })
                .catch((error) => {
                    reject(error)
                });
        })

    }


}