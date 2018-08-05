/*
 *  Created By JD.Francis on 8/4/18
 */

import {BaseService} from "../common/BaseService";

export class TrainService extends BaseService {
    async getTrains(id) {
        let res = await this.get(`/user/${id}/trains`);
        return res.json();
    }
}