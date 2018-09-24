// In App.js in a new project

import React, {Component} from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import Config from './src/common/config';
import Navigator from './routes';
//Reducers - (Redux)
import {trainReducer} from './src/components/Trains/reducers/train.reducer';
import {searchWizardReducer} from './src/components/SearchWizard/searchWizard.reducer';

// Using Axios as an HTTP Client
// Our apps server will be the default endpoint,
// but any url can be specified as the baseURL in the payload
const client = axios.create({
    baseURL: Config.urlPrefix + Config.mockUrl,
    responseType: 'json'
});

//Data Stores - (Redux)
const reducers = combineReducers({
    trains: trainReducer,
    searchWizard: searchWizardReducer
});
const store = createStore(reducers, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
    async componentDidMount() {
        // await this.loadFonts();
    }

    // async loadFonts() {
    //     await Font.loadAsync(
    //         {'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')},
    //         {'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')},
    //         {'Feather': require('@expo/vector-icons/fonts/Feather.ttf')}
    //     );
    // }

    render() {

        return (
            <Provider store={store}>
                <Navigator/>
            </Provider>
        );
    }
}