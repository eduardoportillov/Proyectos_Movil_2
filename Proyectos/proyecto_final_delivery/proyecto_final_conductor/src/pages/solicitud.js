import React, {Component} from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SPage from '../components/SPage';
import SView from '../components/SView';
import Model from '../Model';

export default class solicitud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.id,
        };
    }

    componentDidMount() {
        this.init();
    }

    init() {
        Model.user
            .getLogeado()
            .then(usr => {
                this.state.usr = usr;
                Model.entrega
                    .pendientes({token: usr.access_token})
                    .then(resp => {
                        var data = resp.find(a => a.id == this.state.id);
                        this.setState({
                            data: data,
                        });
                        console.log('recargo');
                    });
            })
            .catch(() => {
                this.props.navigation.replace('login');
            });
    }

    getMapa() {
        if (!this.state.data) return null;
        const {latitudOrigen, longitudOrigen, latitudDestino, longitudDestino} =
            this.state.data;
        return (
            <MapView
                provider={'google'}
                region={{
                    latitude:
                        (parseFloat(latitudOrigen) +
                            parseFloat(latitudDestino)) /
                        2,
                    longitude:
                        (parseFloat(longitudOrigen) +
                            parseFloat(longitudDestino)) /
                        2,
                    // latitude: 0,
                    // longitude: 0,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                onPress={evt => {
                    var coords = evt.nativeEvent.coordinate;
                    var latLng = {
                        latitud: coords.latitude,
                        longitud: coords.longitude,
                    };
                    Model.choferes
                        .changeLocation({
                            id: this.state.usr.chofer,
                            token: this.state.usr.access_token,
                            latLng: latLng,
                        })
                        .then(resp => {
                            console.log(resp);
                        })
                        .catch(e => {
                            console.error(e);
                        });
                }}
                customMapStyle={[]}
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={{
                    width: '100%',
                    flex: 1,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: parseFloat(latitudOrigen),
                        longitude: parseFloat(longitudOrigen),
                    }}
                />
                <Marker
                    coordinate={{
                        latitude: parseFloat(latitudDestino),
                        longitude: parseFloat(longitudDestino),
                    }}
                />
            </MapView>
        );
    }

    getFooter() {
        if (!this.state.data) return null;
        const {
            latitudOrigen,
            longitudOrigen,
            latitudDestino,
            longitudDestino,
            precio,
            estado,
        } = this.state.data;

        return (
            <SView
                width
                height={200}
                bg={'#ffffff'}
                style={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                }}
                center
            >
                <Text style={{fontSize: 18}}>Aceptar el viaje</Text>
                <Text style={{fontSize: 18}}>Estado {estado}</Text>
                <SView height={16} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Bs. {precio}
                </Text>
                <SView height={16} />

                <SView
                    bg={'#ff6666'}
                    p={8}
                    br={4}
                    onPress={() => {
                        Model.entrega
                            .aceptar({
                                id: this.state.id,
                                token: this.state.usr.access_token,
                            })
                            .then(e => {
                                this.props.navigation.replace('entrega', {
                                    id: this.state.id,
                                });
                            });
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#fff',
                            fontWeight: 'bold',
                        }}
                    >
                        Aceptar el viaje
                    </Text>
                </SView>
            </SView>
        );
    }
    render() {
        return (
            <SPage {...this.props} title={'Mapa'}>
                <SView width flex>
                    {this.getMapa()}
                </SView>
                {this.getFooter()}
            </SPage>
        );
    }
}
