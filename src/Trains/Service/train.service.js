/*
 *  Created By JD.Francis on 8/4/18
 */

import {BaseService} from "../../BaseService";

export class TrainService extends BaseService {
    async getTrains(id) {
        let res = await this.get("/trains/" + id);
        console.log(res);
        return res.json();
    }
}