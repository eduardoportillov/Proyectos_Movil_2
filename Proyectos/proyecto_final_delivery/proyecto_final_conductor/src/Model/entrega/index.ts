import { AsyncStorage } from "react-native";
import Config from "../../Config";

export default class entrega {
    static getEnCurso() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem("entrega").then((e) => {
                if (!e) {
                    reject("NOT FOUND");
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
    static setEnCurso(obj) {
        return AsyncStorage.setItem("entrega", JSON.stringify(obj));
    }
    static removeEnCurso(obj) {
        return AsyncStorage.removeItem("entrega");
    }

    static aceptar({ token, id }) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            fetch(`${Config.API}/entregas/${id}/aceptar`, {
                method: "POST",
                headers: myHeaders
            }).then((response) => response.json())
                .then((json) => {
                    this.setEnCurso(json);
                    resolve(json)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }
    static recoger({ token, id }) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            fetch(`${Config.API}/entregas/${id}/recoger`, {
                method: "POST",
                headers: myHeaders
            }).then((response) => response.json())
                .then((json) => {
                    this.setEnCurso(json);
                    resolve(json)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }
    static entregarecogida({ token, id }) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            fetch(`${Config.API}/entregas/${id}/entregarecogida`, {
                method: "POST",
                headers: myHeaders
            }).then((response) => response.json())
                .then((json) => {
                    this.setEnCurso(json);
                    resolve(json)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }
    static entregada({ token, id }) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            fetch(`${Config.API}/entregas/${id}/entregada`, {
                method: "POST",
                headers: myHeaders
            }).then((response) => response.json())
                .then((json) => {
                    this.setEnCurso(json);
                    resolve(json)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }
    static llegadestino({ token, id }) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            fetch(`${Config.API}/entregas/${id}/llegadestino`, {
                method: "POST",
                headers: myHeaders
            }).then((response) => response.json())
                .then((json) => {
                    this.setEnCurso(json);
                    resolve(json)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }


    static pendientes({ token }) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            fetch(`${Config.API}/entregas/pendientes`, {
                method: "GET",
                headers: myHeaders
            }).then((response) => response.json())
                .then((json) => {
                    resolve(json)
                })
                .catch((error) => {
                    reject(error)
                });
        })

    }
    static getAll({ token }) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            fetch(`${Config.API}/entregas`, {
                method: "GET",
                headers: myHeaders
            }).then((response) => response.json())
                .then((json) => {
                    resolve(json)
                })
                .catch((error) => {
                    reject(error)
                });
        })

    }

    static getEstados(estado) {
        var estados = {
            1: {
                key: 1,
                color: "#0f0",
                label: "Entrega solicitada por el cliente",
                message: "",
            },
            2: {
                key: 2,
                color: "#f90",
                label: "Entrega aceptada por el chofer",
                message: "Dirigite a la ubicacion #1 para recibir el paquete.",
                action: "Confirmar llegada"
            },
            3: {
                key: 3,
                color: "#944",
                label: "Esperando cliente para recibir entrega",
                message: "Confirmar que tiene el paquete",
                action: "Confirmar"
            },
            4: {
                key: 4,
                color: "#5f5",
                label: "Chofer en camino con entrega",
                message: "Dirijete a la ubicacion #2 para entregar el paquete.",
                action: "Llege a destino"
            },
            5: {
                key: 5,
                color: "#6ff",
                label: "Entrega en proceso",
                message: "Entrega el paquete al cliente y termina el viaje.",
                action: "Terminar viaje"
            },
            6: {
                key: 6,
                color: "#f60",
                label: "Entrega realizada",
                message: "",
            },
        }
        if (estado) return estados[estado]
        return estados;
    }


}