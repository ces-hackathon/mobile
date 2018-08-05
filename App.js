// In App.js in a new project

import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import UserLogin from "./src/components/User/UserLogin/UserLogin";
import TrainList from "./src/components/Trains/TrainList/TrainList";
import TrainDetails from "./src/components/Trains/TrainDetails/TrainDetails";
import SearchWizard from "./src/components/SearchWizard/SearchWizard";

export default createStackNavigator({
    Home: {
        screen: UserLogin
    },
    TrainList: {
        screen: TrainList
    },
    TrainDetails: {
        screen: TrainDetails
    },
    SearchWizard: {
        screen: SearchWizard
    }
});