/*
 *  Created By JD.Francis on 8/4/18
 */
import React, {Component} from "react"
import {View, ActivityIndicator} from "react-native"
export class BaseComponent extends Component {

    getLoadingView() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </View>
        )
    }
    updateState(keyValues) {
        let state = this.state;
        for (let key in keyValues) {
            state[key] = keyValues[key];
        }
        this.setState(state);
    }
}