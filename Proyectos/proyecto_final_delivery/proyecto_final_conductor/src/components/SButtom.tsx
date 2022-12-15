import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import SView from './SView';

type SButtomProps = {
    onPress?: () => any,
    children: any,
}
export default class SButtom extends Component<SButtomProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return <SView p={16} br={4} bg={"#ff6666"} {...this.props}>
            <Text style={{
                minWidth: 50,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: 18,
                color: "#fff"
            }}>{this.props.children ?? ""}</Text>
        </SView>
    }
}
