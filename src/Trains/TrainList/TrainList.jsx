import React, {Component} from 'react';

export default class TrainList extends Component {

    trainList = [
        {
            groupName: 'HackathonLunchBros',
            thumbnail: "https://www.chick-fil-a.com/-/media/Images/CFACOM/Default-Images/chick-fil-a-logo-vector.ashx",
            startTime: "2018-08-04T16:30:28.661Z",
            endTime: "2018-08-04T17:30:28.661Z",
            userVoteLimit: 2,
            userSuggestionLimit: 2,
            trainSuggestionLimit: 8,
            reminderTime: 30,
            members: [
                {
                    id: 1,
                    username: "olson"
                },
                {
                    id: 2,
                    username: 'AdamSeiford'
                },
                {
                    id: 3,
                    username: 'Noor-Hajyani'
                },
                {
                    id: 4,
                    username: 'DejayJD'
                }
            ],
            votes: [
                {
                    id:1,
                    upvotes: 3,
                    downvotes: 1,
                    name: 'Chick Fil-A',
                    thumbnail: 'https://www.chick-fil-a.com/-/media/Images/CFACOM/Default-Images/chick-fil-a-logo-vector.ashx'
                },
                {
                    id:2,
                    upvotes: 5,
                    downvotes: 4,
                    name: 'Village Burger Bar',
                    thumbnail: 'https://pbs.twimg.com/profile_images/444337668294340608/QdDWaaf5_400x400.jpeg'
                }
            ]
        }
    ];

    render() {
        return (
            <div className="trainlist">
                {this.props.children}
            </div>
        )
    }
}
