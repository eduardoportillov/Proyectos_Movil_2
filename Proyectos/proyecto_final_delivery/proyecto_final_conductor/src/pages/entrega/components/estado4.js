import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapEntrega from '../../../components/MapEstrega';
import SButtom from '../../../components/SButtom';
import SView from '../../../components/SView';
import Model from '../../../Model';

export default class estado4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { entrega, usr, setEntrega } = this.props
    const { estado, latitudOrigen, longitudOrigen, latitudDestino, longitudDestino } = entrega;
    return (
      <SView flex center width={"100%"}>
        <SView>
          <Text style={{ fontSize: 18 }}>{Model.entrega.getEstados(estado).label}</Text>
          <Text>{Model.entrega.getEstados(estado).message}</Text>
        </SView>
        <SView flex width={"100%"}>
          <MapEntrega data={entrega} />
        </SView>
        <SButtom onPress={() => {
          Model.entrega.llegadestino({ token: usr.access_token, id: entrega.id }).then((obj) => {
            setEntrega(obj);
          })
        }}>{Model.entrega.getEstados(estado).action}</SButtom>
      </SView>
    );
  }
}


