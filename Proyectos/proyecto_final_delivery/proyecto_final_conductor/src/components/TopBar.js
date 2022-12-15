import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SView from './SView';

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    renderBack() {
        if (this.props.preventBack) return null;
        return <SView flex height center onPress={() => {
            this.props.navigation.goBack();
        }}>
            <Text style={{
                fontSize: 16
            }}>{"Back"}</Text>
        </SView>
    }
    render() {
        return (
            <SView height={50} row>
                <SView width={70} height>
                    {this.renderBack()}
                </SView>

                <SView flex height center>
                    <Text style={{
                        fontSize: 16
                    }}>{this.props.title ?? ""}</Text>
                </SView>
                <SView width={70} height>

                </SView>
            </SView>
        );
    }
}
