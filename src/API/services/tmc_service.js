import { Instance } from "../instance";
import { tmcsUrl } from "../apiConsts";

export default class TmcService {
  static async getTmcs() {
    return Instance.get(tmcsUrl);
  }

  static async getTmc(tmcId) {
    return Instance.get(`${tmcsUrl}/${tmcId}`);
  }

  static async updateTmc(tmcId, tmc) {
    return Instance.put(`${tmcsUrl}/${tmcId}`, tmc);
  }

  static async createTmc(tmc) {
    return Instance.post(tmcsUrl, tmc);
  }
}
