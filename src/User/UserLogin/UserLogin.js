import React, { Component } from 'react';
import {Button} from 'react-native';

export default class UserLogin extends Component {
    static navigationOptions = {
        title: 'Login',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Login"
                onPress={() =>
                    navigate('TrainList', { name: 'DejayJD' })
                }
            />
        );
    }
}
