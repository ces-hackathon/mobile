/*
 *  Created By JD.Francis on 8/4/18
 */
import _ from "lodash";
import Config from '../../../common/config';
// Redux data store for train related endpoints
const defaultState = {
    userTrainList: []
};

export function trainReducer(state = defaultState, action) {
    switch (action.type) {
        case 'GET_TRAINS_SUCCESS':
            return {...state, userTrainList: action.payload.data};
        case 'SET_CURRENT_TRAIN':
            return {...state, currentTrain: action.data};
        case 'ADD_NOM_TO_SUGGESTIONS':
            //See if the nom is already in the list of suggestions
            let nomExists = _.findIndex(state.currentTrain.noms, (nom) => {
                return nom.id == action.data['id'];
            });
            if (nomExists < 0) {
                let newTrain = _.cloneDeep(state.currentTrain);
                newTrain.noms.push(action.data);
                return {...state, currentTrain: newTrain};
            }
            else {
                return state;
            }
        case 'ADD_VOTE_TO_NOM':
            //Find and update the current train page to vote
            let updatedTrains = _.cloneDeep(state.userTrainList);
            let ref = _.find(updatedTrains[state.currentTrain].noms, (nom)=> {
                return nom.id == action.data.nom.id;
            });
            ref[action.data.voteType] += 1;
            return {...state, userTrainList: updatedTrains};
        default:
            return state;
    }
}

// Functions
export function getUserTrains(id) {
    return {
        type: 'GET_TRAINS',
        payload: {
            request: {
                url: `/user/${id}/trains`
            }
        }
    };
}

export function addNomToTrainSuggestions(suggestion) {
    return {
        type: 'ADD_NOM_TO_SUGGESTIONS',
        data: suggestion
    };
}

export function setCurrentTrain(train) {
    return {
        type: 'SET_CURRENT_TRAIN',
        data: train
    };
}

export function addVoteToNom(nom, voteType) {
    return {
        type: 'ADD_VOTE_TO_NOM',
        data: {nom: nom, voteType: voteType}
    }
}

export function convertGoogleApiObjectToNom(data) {
    let newNom = {
        upvotes: 0,
        downvotes: 0,
        id: data['id'],
        name: data['name'],
        thumbnail: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data['photos'][0]['photo_reference']}&key=${Config.googleMapsApiKey}`
    };
    console.log(newNom['thumbnail']);
    return newNom;
}

