/*
 *  Created By JD.Francis on 8/4/18
 */

import {Config} from "./config";

export class BaseService {
    handleError(e, caller) {
        console.error(e);
        console.error(caller);
    }

    async get(path) {
        let finalUrl = Config.urlPrefix + Config.mockUrl + path;
        try {
            return await fetch(finalUrl);
        }
        catch (e) {
            console.error(`ERROR - occurred in ${finalUrl}`);
            console.error(e);
        }
    }
}