import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './TrainListItem.style';
import {ListItem} from "react-native-elements"

export class TrainListItem extends Component {
    //Returns format: "1h30m"
    calculateTimeRemaining(train) {
        let now = new Date();
        let end = new Date(train.endTime);
        let diff = new Date(end-now);
        console.log(diff);
        let diffText = `${diff.getHours()}H${diff.getMinutes()}m`;
        if (diff > 0) {
            diffText = "oldoe";
        }
        return diffText;
    }

    render() {
        //TODO: Calculate vote count
        let voteCount = 10;
        let timeRemaining =this.calculateTimeRemaining(this.props.train);
        return (
            <Text style={styles.container}>
                <Text style={styles.innerContainer}>
                    Name: {this.props.train.groupName} -
                    Members: {this.props.train.members.length} -
                    Votes: {voteCount} -
                    Time Remaining: {timeRemaining}
                </Text>
            </Text>
        )
    }
}
