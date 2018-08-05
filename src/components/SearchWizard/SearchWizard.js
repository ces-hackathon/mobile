import React, {Component} from 'react';
import {FlatList, Text, View} from "react-native";
import {Icon, List, ListItem} from "react-native-elements";
import {Font} from 'expo'
import {BaseComponent} from "../../common/BaseComponent";
import * as _ from "lodash";

export default class SearchWizard extends BaseComponent {
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
        await this.getNomList();
        this.updateState({isLoading: false});
    }

    async getNomList() {

    }

    async loadFonts() {
        await Font.loadAsync({'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')});
        await Font.loadAsync({'Feather': require('@expo/vector-icons/fonts/Feather.ttf')});
    }


    render() {
        //Loading View
        if (this.state.isLoading) {
            return this.getLoadingView();
        }
        return (
            <Text>Search wizard 🔍</Text>
        )
    }
}
