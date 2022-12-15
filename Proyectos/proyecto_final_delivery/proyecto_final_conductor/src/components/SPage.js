import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TopBar from './TopBar';

export default class SPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <View style={{
                width: "100%",
                flex: 1,
            }}>
                <TopBar {...this.props} />
                {this.props.children}
            </View>
        );
    }
}
