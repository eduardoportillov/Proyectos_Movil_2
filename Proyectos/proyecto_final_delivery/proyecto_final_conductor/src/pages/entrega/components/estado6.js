import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SButtom from '../../../components/SButtom';
import Model from '../../../Model';

export default class estado6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { entrega, usr, setEntrega } = this.props

    return (
      <View>
        <Text> El viaje finalizo con exito </Text>
        <SButtom onPress={() => {
          Model.entrega.removeEnCurso();
          this.props.navigation.replace("root");
        }}>removeEnCurso</SButtom>
      </View>
    );
  }
}
