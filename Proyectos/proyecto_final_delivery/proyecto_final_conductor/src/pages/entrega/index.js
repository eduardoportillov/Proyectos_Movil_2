import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SPage from '../../components/SPage';
import SView from '../../components/SView';
import Model from '../../Model';
import components from './components';
export default class entrega extends Component {
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
            Model.entrega.getEnCurso().then(entrega => {
                this.state.entrega = entrega;
                this.setState({ ...this.state })
            }).catch(() => {
                this.props.navigation.replace("root");
            })
        }).catch(() => {
            this.props.navigation.replace("login");
        })
    }

    renderEntrega() {
        const { entrega, usr } = this.state;
        if (!entrega) return <Text>No se encontro entrega</Text>;
        const { estado } = entrega;
        if (!estado) return <Text>No se encontro estado</Text>;
        console.log(estado)
        const ITEM = components[estado];
        if (!ITEM) return <Text>No se encontro el ITEM</Text>;
        return <SView flex center>
            <ITEM entrega={entrega} usr={usr} setEntrega={(obj) => {
                this.setState({ entrega: obj })
            }} {...this.props} />
        </SView>
    }

    render() {
        return (
            <SPage  {...this.props} title={"Entrega"}>
                {this.renderEntrega()}
            </SPage>
        );
    }
}
