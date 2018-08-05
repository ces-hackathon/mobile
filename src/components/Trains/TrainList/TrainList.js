import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {TrainService} from "../../../service/train.service";
import {TrainListItem} from "../TrainListItem/TrainListItem";
import {BaseComponent} from "../../../common/BaseComponent";
import {List, ListItem} from "react-native-elements"
import { MaterialIcons } from '@expo/vector-icons';
import { Font, AppLoading } from 'expo'
import { Ionicons } from '@expo/vector-icons';

export default class TrainList extends BaseComponent {
    static navigationOptions = {
        title: 'Trains',
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
        this.trainService = new TrainService();
    }

    async componentWillMount() {
        await Font.loadAsync({ 'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf') })
        await Font.loadAsync({ 'Feather': require('@expo/vector-icons/fonts/Feather.ttf') })
    }

    async componentDidMount() {
        await this.getTrains();
    }

    async getTrains() {
        let trains = await this.trainService.getTrains(1);
        this.setState({
            isLoading: false,
            trains: trains
        });
    }

    render() {
        //Loading View
        if (this.state.isLoading) {
            return this.getLoadingView();
        }
        //Get current user data
        const {navigation} = this.props;
        const name = navigation.getParam('name', '');
        //Main View
        return (
            <View style={{flex: 1}}>
                <Text style={{fontSize:22}}>
                    Welcome, {name} {"\n"} Trains:
                </Text>
                <List>
                    <FlatList
                        data={this.state.trains}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ListItem
                                onPress={() =>
                                    navigation.navigate('TrainDetails', {train:item})
                                }
                                key={"id" + item.id}
                                roundAvatar
                                title={item.groupName}
                                titleStyle={{flex:1}}
                                avatar={item.thumbnail}
                                rightIcon={{name:'users', type:'feather',color:"powderblue"}}
                                rightTitle={item.members.length.toString()}
                                rightTitleStyle={{fontSize:22, color:"powderblue", paddingTop:3}}
                            >
                            </ListItem>
                        )}
                    />
                </List>
            </View>
        )
    }
}
