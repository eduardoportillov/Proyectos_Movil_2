import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';

type SViewProps = {
    center?: boolean,
    flex?: boolean,
    height?: any,
    width?: any,
    row?: boolean,
    br?: number,
    p?: number,
    m?: number,
    bg?: string,
    onPress?: () => any,
    style?: ViewStyle,
    children?: any

}
export default class SView extends Component<SViewProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        var ItemType: any = View;
        var extraProps: SViewProps = {
            style: {}
        }

        if (this.props.flex) {
            extraProps.style.flex = 1;
        }
        if (this.props.flex) {
            extraProps.style.flex = 1;
        }
        if (this.props.br) {
            extraProps.style.borderRadius = this.props.br;
        }
        if (this.props.p) {
            extraProps.style.padding = this.props.p;
        }
        if (this.props.m) {
            extraProps.style.margin = this.props.m;
        }
        if (this.props.bg) {
            extraProps.style.backgroundColor = this.props.bg;
        }
        if (this.props.br) {
            extraProps.style.borderRadius = this.props.br;
        }
        if (this.props.center) {
            extraProps.style.justifyContent = "center";
            extraProps.style.alignItems = "center";
        }
        if (this.props.row) {
            extraProps.style.flexDirection = "row";
        }
        if (this.props.height) {
            if (typeof this.props.height == "number") {
                extraProps.style.height = this.props.height
            } else if (typeof this.props.height == "string") {
                extraProps.style.height = this.props.height
            } else {
                extraProps.style.height = "100%"
            }
        }
        if (this.props.width) {
            if (typeof this.props.width == "number") {
                extraProps.style.width = this.props.width
            } else if (typeof this.props.width == "string") {
                extraProps.style.width = this.props.width
            } else {
                extraProps.style.width = "100%"
            }
        }

        if (this.props.style) {
            extraProps.style = { ...extraProps.style, ...this.props.style }
        }

        if (this.props.onPress) {
            ItemType = TouchableOpacity
            extraProps.onPress = this.props.onPress
        }
        return (
            <ItemType  {...extraProps}>
                {this.props.children}
            </ItemType>
        );
    }
}
