import Config from "../../Config";

export default class choferes {
    static changeLocation({ token, id, latLng }) {
        return new Promise((resolve, reject) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Content-Type", "application/json");
            fetch(`${Config.API}/choferes/${id}/location`, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(latLng)
            }).then((response) => response.json())
                .then((json) => {
                    resolve(json)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }
}