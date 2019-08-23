/*
 *  Created By JD.Francis on 8/4/18
 */
import React, {Component} from "react"
import {View, ActivityIndicator} from "react-native"
import {Font} from "expo";
export class BaseComponent extends Component {

    getLoadingView() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </View>
        )
    }

    async componentWillMount() {
        await Font.loadAsync(
            {'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')},
            {'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')},
            {'Feather': require('@expo/vector-icons/fonts/Feather.ttf')}
        );
    }
    updateState(keyValues) {
        let state = this.state;
        for (let key in keyValues) {
            state[key] = keyValues[key];
        }
        this.setState(state);
    }
}