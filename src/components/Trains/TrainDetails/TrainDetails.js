import React, {Component} from 'react';
import {FlatList, Text, View} from "react-native";
import {Icon, List, ListItem} from "react-native-elements";
import {BaseComponent} from "../../../common/BaseComponent";
import {connect} from 'react-redux';
import {Font} from 'expo'
import * as _ from "lodash";
import {addVoteToNom} from '../reducers/train.reducer';

/* Redux Stuff */
// const loadingSelector = createLoadingSelector(['GET_TRAINS']);
// This updates the state of our object when redux updates
const mapStateToProps = (state) => ({
        currentTrain: state.trains.currentTrain,
        userTrainList: state.trains.userTrainList
    }
);
// This connects the dots between the function, the component, and redux
const mapDispatchToProps = {
    addVoteToNom
};

export class TrainDetails extends BaseComponent {
    fontLoading = true;

    async componentWillMount() {
        await this.loadFonts();
    }

    async componentDidMount() {
        this.fontLoading = true;
        const {navigation} = this.props;
        this.navigation = navigation;
    }

    async loadFonts() {
        await Font.loadAsync(
            {'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')},
            {'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')},
            {'Feather': require('@expo/vector-icons/fonts/Feather.ttf')}
        );
        this.fontLoading = false;
    }

    navigateToSearchWizard() {
        let currentTrain = this.getCurrentTrain();
        if (currentTrain.noms.length >= currentTrain.trainSuggestionLimit) {
            return;
        }
        this.navigation.navigate("SearchWizard", {existingNoms: this.props.currentTrain.noms})
    }


    //Type is either 'downvotes' or 'upvotes'
    vote(item, type) {
        this.props.addVoteToNom(item, type);
    }

    getCurrentTrain() {
        if (this.props.userTrainList != null) {
            return this.props.userTrainList[this.props.currentTrain];
        }
        return null;
    }

    render() {
        //Loading View
        let currentTrain = this.getCurrentTrain();
        if (this.props.isLoading || _.isNil(currentTrain) || this.fontLoading) {
            return this.getLoadingView();
        }
        currentTrain.noms = _.map(currentTrain.noms, nom => {
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
                        data={currentTrain.noms}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ListItem
                                roundAvatar
                                key={"id" + item.id}
                                title={item.name}
                                avatar={item.thumbnail}
                                rightIcon={
                                    <View>
                                        <Icon
                                            type={'feather'}
                                            name={'arrow-up'}
                                            color={'#2196F3'}
                                            onPress={() => {
                                                this.vote(item, 'upvotes')
                                            }}
                                        />
                                        <Text style={{marginLeft: 7}}>{item.totalVotes}</Text>
                                        <Icon
                                            type={'feather'}
                                            name={'arrow-down'}
                                            color={'#FF5722'}
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
                                onPress={() => {
                                    this.navigateToSearchWizard()
                                }}
                                disabled={currentTrain.noms.length >= currentTrain.trainSuggestionLimit}
                                rightIcon={{name: 'plus-circle', type: 'feather', color:'black'}}
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

export default connect(mapStateToProps, mapDispatchToProps)(TrainDetails)