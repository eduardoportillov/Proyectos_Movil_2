import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import SView from './SView';

type BottomBarProps = {
    navigation?: any
}
export default class BottomBar extends Component<BottomBarProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderBtn({ label, url }) {
        return <SView flex center height onPress={() => {
            this.props.navigation.navigate(url)
        }}>
            <Text>{label}</Text>
        </SView>
    }
    render() {
        return (
            <SView height={50} style={{
                backgroundColor: "#fff"
            }} center row>
                {this.renderBtn({ label: "Tus entregas", url: "historial" })}
                {this.renderBtn({ label: "Pendientes", url: "root" })}
                {this.renderBtn({ label: "Ajustes", url: "ajustes" })}

            </SView>
        );
    }
}
