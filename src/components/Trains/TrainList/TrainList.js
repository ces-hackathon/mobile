import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
// import {TrainService} from "../reducers/train.reducer";
import {BaseComponent} from "../../../common/BaseComponent";
import {List, ListItem} from "react-native-elements"
import {Font} from 'expo'
import {getUserTrains, setCurrentTrain} from "../reducers/train.reducer";
import {connect} from 'react-redux';
import {createLoadingSelector} from "../../../common/loadingReducer";

/* Redux Stuff */
const loadingSelector = createLoadingSelector(['GET_TRAINS']);
// This updates the state of our object when redux updates
const mapStateToProps = (state) => ({
        //The map adds a key to the values which is necessary to index FlatList in React
        userTrainList: state.trains.userTrainList.map(train => ({key: train.id, ...train})),
        isLoading: loadingSelector(state)
    }
);
// This connects the dots between the function, the component, and redux
const mapDispatchToProps = {
    getUserTrains,
    setCurrentTrain
};

class TrainList extends BaseComponent {
    fontLoading = true;

    async componentDidMount() {
        await this.loadFonts();
        this.props.getUserTrains(1);
        const {navigation} = this.props;
        this.navigation = navigation;
    }

    static navigationOptions = {
        title: 'Trains',
        // headerStyle: {
        //     height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT : 54,
        //     backgroundColor: '#2196F3'
        // },
        // headerTitleStyle: {
        //     marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
        //     color: "white"
        // },
        // headerLeft : (
        //
        // )
    };

    constructor(props) {
        super(props);
    }

    async loadFonts() {
        await Font.loadAsync(
            {'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')},
            {'Feather': require('@expo/vector-icons/fonts/Feather.ttf')}
        );
        this.fontLoading = false;
    }

    navigateToCreateTrainScreen() {
        //TODO
    }

    setCurrentTrain(train) {
        console.log(train);
        this.props.setCurrentTrain(train);
        this.navigation.navigate('TrainDetails');
    }

    render() {

        //Loading View
        if (this.props.isLoading || this.fontLoading) {
            return this.getLoadingView();
        }
        let name = 'DejayJD';
        //Main View
        return (
            <View style={{flex: 1}}>
                <Text style={{fontSize: 22}}>
                    Welcome, {name} {"\n"} Trains:
                </Text>
                <List>
                    <FlatList
                        data={this.props.userTrainList}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({item, index}) => (
                            <ListItem
                                onPress={() => this.setCurrentTrain(index)}
                                key={"id" + item.id}
                                roundAvatar
                                title={item.groupName}
                                titleStyle={{flex: 1}}
                                avatar={item.thumbnail}
                                rightIcon={{name: 'users', type: 'feather', color: "powderblue"}}
                                rightTitle={item.members.length.toString()}
                                rightTitleStyle={{fontSize: 22, color: "powderblue", paddingTop: 3}}
                            >
                            </ListItem>
                        )}
                        ListFooterComponent={
                            <ListItem
                                onPress={() => {
                                    this.navigateToCreateTrainScreen()
                                }}
                                rightIcon={{name: 'plus-circle', type: 'feather', color: 'black'}}
                                roundAvatar
                                key={"add"}
                                title={'Create New'}
                            >
                            </ListItem>
                        }
                    />
                </List>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainList)