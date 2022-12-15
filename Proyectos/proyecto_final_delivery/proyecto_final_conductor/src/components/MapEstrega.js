import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SPage from '../components/SPage';
import SView from '../components/SView';
import Model from '../Model';

export default class MapEntrega extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.init()
    }

    init() {
        Model.user.getLogeado().then((usr) => {
            this.state.usr = usr;
            this.setState({ ...this.state })
        }).catch(() => {

        })
    }

    getMapa() {
        if (!this.props.data) return <Text>Cargando mapa...</Text>
        const { latitudOrigen, longitudOrigen, latitudDestino, longitudDestino } = this.props.data;
        return <MapView
            provider={'google'}
            region={{
                latitude: (parseFloat(latitudOrigen) + parseFloat(latitudDestino)) / 2,
                longitude: (parseFloat(longitudOrigen) + parseFloat(longitudDestino)) / 2,
                // latitude: 0,
                // longitude: 0,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}
            onPress={(evt) => {
                var coords = evt.nativeEvent.coordinate;
                var latLng = {
                    latitud: coords.latitude,
                    longitud: coords.longitude
                }
                Model.choferes.changeLocation({ id: this.state.usr.cliente, token: this.state.usr.access_token, latLng: latLng }).then(resp => {
                    console.log(resp)
                }).catch(e => {
                    console.error(e);
                })
            }}
            customMapStyle={[

            ]}
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={{
                width: "100%",
                flex: 1
            }}
        >
            <Marker coordinate={{ latitude: parseFloat(latitudOrigen), longitude: parseFloat(longitudOrigen) }} />
            <Marker coordinate={{ latitude: parseFloat(latitudDestino), longitude: parseFloat(longitudDestino) }} />
        </MapView>
    }


    render() {
        return (<SView width flex>
            {this.getMapa()}
        </SView>
        );
    }
}
