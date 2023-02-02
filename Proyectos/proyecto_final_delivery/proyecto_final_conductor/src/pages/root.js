import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import BottomBar from '../components/BottomBar';
import SView from '../components/SView';
import TopBar from '../components/TopBar';
import Model from '../Model';

const delay = ms => new Promise(res => setTimeout(res, ms));

export default class root extends Component {
    isRun = true;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.isRun = true;
        this.init();
        // this.hilo();
    }

    init() {
        Model.user
            .getLogeado()
            .then(usr => {
                Model.entrega
                    .getEnCurso()
                    .then(r => {
                        this.isRun = false;
                        this.props.navigation.replace('entrega');
                    })
                    .catch(() => {
                        this.isRun = true;
                        Model.entrega
                            .pendientes({token: usr.access_token})
                            .then(resp => {
                                this.setState({
                                    data: resp.reverse(),
                                });
                            });
                    });
            })
            .catch(() => {
                this.isRun = false;

                this.props.navigation.replace('login');
            });
    }

    getList() {
        console.log(recarga);
        Model.entrega.pendientes({token: usr.access_token}).then(resp => {
            this.setState({
                data: resp.reverse(),
            });
        });
    }

    // hilo = async () => {
    //     if (this.isRun) {
    //         console.log('hilo');
    //         this.init();
    //         await delay(1000);
    //         this.hilo();
    //     }
    // };

    getLista() {
        if (!this.state.data) return null;
        return this.state.data.map(obj => {
            return (
                <TouchableOpacity
                    style={{
                        padding: 8,
                    }}
                    onPress={() => {
                        this.isRun = false;
                        this.props.navigation.navigate('solicitud', {
                            id: obj.id,
                        });
                    }}
                >
                    <SView
                        style={{
                            padding: 8,
                            backgroundColor: '#00000022',
                            borderRadius: 4,
                        }}
                        row
                        center
                    >
                        <SView
                            width={50}
                            height={50}
                            style={{
                                borderRadius: 100,
                                backgroundColor: '#F35216',
                            }}
                            center
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                }}
                                bold
                            >
                                {obj.id}
                            </Text>
                        </SView>
                        <SView width={8} />
                        <SView flex>
                            <Text>Bs. {obj.precio}</Text>
                        </SView>
                        {/* <Text>{JSON.stringify(obj)}</Text> */}
                    </SView>
                </TouchableOpacity>
            );
        });
    }
    render() {
        return (
            <SView flex>
                <TopBar preventBack title={'Pendientes'} />
                <SView flex>
                    <ScrollView>{this.getLista()}</ScrollView>
                </SView>
                <BottomBar {...this.props} />
            </SView>
        );
    }
}
