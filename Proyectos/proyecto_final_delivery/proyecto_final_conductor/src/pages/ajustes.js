import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BottomBar from '../components/BottomBar';
import SView from '../components/SView';
import TopBar from '../components/TopBar';
import Model from '../Model';


export default class ajustes extends Component {
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
            Model.entrega.getEnCurso().then(r => {
                this.props.navigation.replace("entrega")
            }).catch(() => {
                Model.entrega.pendientes({ token: usr.access_token }).then((resp) => {
                    this.setState({
                        data: resp
                    })
                })
            })

        }).catch(() => {
            this.props.navigation.replace("login");
        })
    }
    getLista() {
        if (!this.state.data) return null;
        console.log(this.state.data)
        console.log("***************************")
        return this.state.data.map((obj) => {
            return <TouchableOpacity style={{
                padding: 4,
            }} onPress={() => {
                this.props.navigation.navigate("solicitud", { id: obj.id })
            }}>
                <View style={{
                    padding: 8,
                    backgroundColor: "#00000022",
                    borderRadius: 4
                }}>
                    <Text>{obj.id}</Text>
                    <Text>{obj.precio}</Text>
                    <Text>{JSON.stringify(obj)}</Text>
                </View>
            </TouchableOpacity>
        })
    }
    render() {

        return (
            <SView flex>
                <TopBar preventBack  title={"Ajustes"}/>
                <SView flex>
                    <TouchableOpacity onPress={() => {
                        Model.user.closeSession();
                        this.init();
                    }} style={{
                        padding: 16
                    }}>
                        <Text>CERRAR SESSION</Text>
                    </TouchableOpacity>
                </SView>
                <BottomBar {...this.props} />
            </SView>
        );
    }
}
