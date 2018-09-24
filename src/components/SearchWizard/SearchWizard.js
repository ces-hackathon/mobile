import React, {Component} from 'react';
import {FlatList, View} from "react-native";
import {ListItem, SearchBar} from "react-native-elements";
import {Font} from 'expo'
import {BaseComponent} from "../../common/BaseComponent";
import * as _ from "lodash";
import {connect} from 'react-redux';

import {createLoadingSelector} from "../../common/loadingReducer";
import {queryPlacesByString} from './searchWizard.reducer';
import {addNomToTrainSuggestions, convertGoogleApiObjectToNom} from '../Trains/reducers/train.reducer';

/* Redux Stuff */
const loadingSelector = createLoadingSelector(['QUERY_PLACES_BY_STRING']);
// This updates the state of our object when redux updates
const mapStateToProps = (state) => {
    let searchResults = [];
    if (!_.isNil(state.searchWizard.searchResults['results'])) {
        //The map adds a key to the values which is necessary to index FlatList in React
        // console.log(Array.isArray(state.searchWizard.searchResults));
        searchResults = state.searchWizard.searchResults['results'].map(res => ({key: res.id, ...res}));
    }
    return {
        searchResults: searchResults,
        isLoading: loadingSelector(state)
    }
};
// This connects the dots between the function, the component, and redux
const mapDispatchToProps = {
    queryPlacesByString,
    addNomToTrainSuggestions
};

class SearchWizard extends BaseComponent {
    defaultLocation = "32.786018999999996,-96.8029131";

    async componentDidMount() {
        await this.loadFonts();
        await this.getInitialNomList();
        const {navigation} = this.props;
        this.navigation = navigation;
    }

    async getInitialNomList() {

    }

    async loadFonts() {
        await Font.loadAsync({'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')});
        await Font.loadAsync({'Feather': require('@expo/vector-icons/fonts/Feather.ttf')});
    }

    findNoms(queryString) {
        this.props.queryPlacesByString(this.defaultLocation, queryString);
    }

    addNom(nom) {
        //TODO: dispatcher to add this nom to the store
        this.props.addNomToTrainSuggestions(convertGoogleApiObjectToNom(nom));
        this.navigation.navigate('TrainDetails');
    }

    render() {
        //Loading View
        // if (this.props.isLoading) {
        //     return this.getLoadingView();
        // }
        // console.log(this.props.searchResults);
        return (
            <View>
                <SearchBar
                    onChangeText={(text) => {
                        this.findNoms(text)
                    }}
                    placeholder='Find a Nom...'/>
                <FlatList
                    data={this.props.searchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <ListItem
                            onPress={() =>
                                this.addNom(item)
                            }
                            key={item['place_id']}
                            title={item.name}
                        >
                        </ListItem>
                    )}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWizard)