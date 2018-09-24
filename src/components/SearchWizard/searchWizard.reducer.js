/*
 *  Created By JD.Francis on 8/4/18
 */
import * as _ from "lodash";
import Config from '../../common/config';
// Redux data store for train related endpoints
const defaultState = {
    searchResults: []
};

export function searchWizardReducer(state = defaultState, action) {
    switch (action.type) {
        case 'GET_SEARCH_HISTORY_SUCCESS':
            return { ...state, searchResults: action.payload.data };
        case 'GET_DEFAULT_SEARCH_ITEMS_SUCCESS':
            return { ...state, searchResults: action.payload.data };
        case 'QUERY_PLACES_BY_STRING_SUCCESS':
            return {...state, searchResults: action.payload.data };
        default:
            return state;
    }
}

// Functions
export function queryPlacesByString(location, queryString, userParams = {}) {
    let defaultParams = {
        type: 'restaurant',
        radius: 1500,
        location: location,
        keyword: queryString,
        key: Config.googleMapsApiKey
    };
    let finalParams = _.merge(defaultParams, userParams);
    return {
        type: 'QUERY_PLACES_BY_STRING',
        payload: {
            request: {
                params: finalParams,
                baseURL: Config.googleMapsUrl,
                url: `/place/nearbysearch/json`,
                responseType:"json"
            }
        },
    };
}