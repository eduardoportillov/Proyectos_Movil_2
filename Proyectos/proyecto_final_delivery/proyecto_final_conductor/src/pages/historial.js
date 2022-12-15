import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BottomBar from '../components/BottomBar';
import SView from '../components/SView';
import TopBar from '../components/TopBar';
import Model from '../Model';


export default class historial extends Component {
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
                Model.entrega.getAll({ token: usr.access_token }).then((resp) => {
                    console.log(usr)
                    var arr = resp.filter(o => o.chofer_id == usr.cliente);
                    this.setState({
                        data: arr
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
            return <SView style={{
                padding: 8,
            }} >
                <SView style={{
                    padding: 8,
                    backgroundColor: "#00000022",
                    borderRadius: 4
                }} row center>
                    <SView width={50} height={50} style={{
                        borderRadius: 100,
                        backgroundColor: Model.entrega.getEstados(obj.estado).color
                    }} center>
                        <Text style={{
                            color: "#fff"
                        }} bold>{obj.id}</Text>
                    </SView>
                    <SView width={8} />
                    <SView flex>
                        <Text>Bs. {obj.precio}</Text>
                    </SView>
                    <SView flex>
                        <Text>Estado: {Model.entrega.getEstados(obj.estado).label}</Text>
                    </SView>
                    {/* <Text>{JSON.stringify(obj)}</Text> */}
                </SView>
            </SView>
        })
    }
    render() {

        return (
            <SView flex>
                <SView flex>
                    <TopBar preventBack title={"Historial"} />
                    <ScrollView>
                        {this.getLista()}
                    </ScrollView>
                </SView>
                <BottomBar {...this.props} />
            </SView>
        );
    }
}
