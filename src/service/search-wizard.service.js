/*
 *  Created By JD.Francis on 8/4/18
 */

import {BaseService} from "../common/BaseService";
import * as _ from "lodash";

export class SearchWizardService extends BaseService {
    async getSearchHistory(id) {
        let res = await this.get(`/user/${id}/search/history`);
        return res.json();
    }

    async getDefaultSearchItems(id, location, userParams = {}) {
        let path = `/place/nearbysearch/json`;
        let defaultParams = {
            rankby: 'distance',
            type: 'restaurant',
            radius: 1500,
            location: location,
            pagetoken: 0
        };
        let finalParams = _.merge(defaultParams, userParams);
        let res = await this.get(path, finalParams, 'Maps');
        return res.json();
    }

    async queryPlacesByString(location, queryString, userParams = {}) {
        let path = `/place/nearbysearch/json`;
        let defaultParams = {
            type: 'restaurant',
            radius: 1500,
            location: location,
            keyword: queryString
        };
        let finalParams = _.merge(defaultParams, userParams);
        let res = await this.get(path, finalParams, 'Maps');
        return res.json();
    }
}