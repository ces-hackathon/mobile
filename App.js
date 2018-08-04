// In App.js in a new project

import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import UserLogin from "./src/User/UserLogin/UserLogin";
import TrainList from "./src/Trains/TrainList/TrainList";

export default createStackNavigator({
    Home: {
        screen: UserLogin
    },
    TrainList: {
        screen: TrainList
    }
});