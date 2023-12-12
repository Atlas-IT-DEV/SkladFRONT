import { Instance } from "../instance";
import { tmcsUrl } from "../apiConsts";

export default class TmcService {
  static async getTmcs() {
    return Instance.get(tmcsUrl);
  }

  static async getTmc(tmcId) {
    return Instance.get(`${tmcsUrl}/${tmcId}`);
  }

  static async deleteTmc(tmcId) {
    return Instance.delete(`${tmcsUrl}/${tmcId}`);
  }

  static async updateTmc(tmcId, data) {
    return Instance.put(`${tmcsUrl}/${tmcId}`, data);
  }

  static async createTmc(data) {
    return Instance.post(tmcsUrl, data);
  }
}
