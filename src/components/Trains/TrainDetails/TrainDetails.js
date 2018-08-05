import React, {Component} from 'react';
import {FlatList, Text, View} from "react-native";
import {Icon, List, ListItem} from "react-native-elements";
import {Font} from 'expo'
import {BaseComponent} from "../../../common/BaseComponent";
import * as _ from "lodash";

export default class TrainDetails extends BaseComponent {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            error: null,
            refreshing: false,
            train: {noms: []}
        };
    }

    async componentDidMount() {
        await this.loadFonts();
        const {navigation} = this.props;
        this.navigation = navigation;
        this.train = navigation.getParam('train', {});
        this.updateState({train: this.train});
    }

    async loadFonts() {
        await Font.loadAsync({'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')});
        await Font.loadAsync({'Feather': require('@expo/vector-icons/fonts/Feather.ttf')});
        this.updateState({isLoading: false});
    }

    navigateToSearchWizard() {
        if (this.state.train.noms.length >= this.state.train.trainSuggestionLimit) {
            return;
        }
        this.navigation.navigate("SearchWizard", {existingNoms:this.state.train.noms})
    }


    vote(item, type) {
        item[type] += 1;
        this.updateState({train: this.train});
    }

    render() {
        //Loading View
        if (this.state.isLoading) {
            return this.getLoadingView();
        }
        this.state.train.noms = _.map(this.state.train.noms, nom => {
            nom.totalVotes = nom.upvotes - nom.downvotes;
            return nom;
        });
        return (
            <View style={{flex: 1}}>
                <Text style={{fontSize: 20}}>
                    Noms:
                </Text>
                <List style={{flex: 1}}>
                    <FlatList
                        data={this.state.train.noms}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({item}) => (
                            <ListItem
                                roundAvatar
                                key={"id" + item.id}
                                title={item.name}
                                avatar={item.thumbnail}
                                rightIcon={
                                    <View>
                                        <Icon
                                            type={'material-community'}
                                            name={'arrow-up-bold-box'}
                                            onPress={() => {
                                                this.vote(item, 'upvotes')
                                            }}
                                        />
                                        <Text style={{paddingLeft:2}}>{item.totalVotes}</Text>
                                        <Icon
                                            type={'material-community'}
                                            name={'arrow-down-bold-box'}
                                            onPress={() => {
                                                this.vote(item, 'downvotes')
                                            }}
                                        />
                                    </View>
                                }
                            >
                            </ListItem>
                        )}
                        ListFooterComponent={
                            <ListItem
                                onPress={()=>{this.navigateToSearchWizard()}}
                                disabled={this.state.train.noms.length >= this.state.train.trainSuggestionLimit}
                                rightIcon={{}}
                                roundAvatar
                                key={"add"}
                                title={'add'}
                            >
                            </ListItem>
                        }
                    />
                </List>
            </View>
        )
    }
}
