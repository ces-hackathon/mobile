import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {TrainService} from "../../../service/train.service";

export default class TrainList extends Component {
    constructor(props){
        super(props);
        this.state = {isLoading: true};
        this.trainService = new TrainService();
        this.getTrains();
    }

    async getTrains() {
        let trains = await this.trainService.getTrains(1);
        this.setState({
            isLoading: false,
            trains: trains
        });
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        const {navigation} = this.props;
        const name = navigation.getParam('name', 'idiot');
        return (
            <Text>Welcome {name} {"\n"}Trains: {this.state.trains.length}</Text>
        )
    }
}
