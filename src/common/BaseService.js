/*
 *  Created By JD.Francis on 8/4/18
 */

import Config from "./config";
import * as _ from "lodash";

export class BaseService {

    handleError(e, caller) {
        console.error(e);
        console.error(caller);
    }

    determineApiUrl(api, params) {
        let result = {url:'', params:params};
        if (api == 'LunchBro') {
            result.url = Config.urlPrefix +  Config.mockUrl
        }
        else if (api =='Maps') {
            result.url = Config.googleMapsUrl;
            result.params['key'] = Config.googleMapsApiKey;
        }
        return result;
    }

    async get(path, params = {}, api = 'LunchBro') {
        let apiDetails = this.determineApiUrl(api, params);
        let finalUrl = apiDetails.url + path + this.generateQueryParams(apiDetails.params);
        try {
            return await fetch(finalUrl);
        }
        catch (e) {
            console.error(`ERROR - occurred in ${finalUrl}`);
            console.error(e);
        }
    }

    generateQueryParams(params) {
        if (_.isEmpty(params) || params == null || typeof(params) !== 'object') {
            return "";
        }
        return "?" + Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
}