import { Instance } from "../instance";
import { tmcTypesUrl } from "../apiConsts";

export default class TmcTypeService {
  static async getTmcTypes() {
    return Instance.get(tmcTypesUrl);
  }

  static async getTmcType(tmcId) {
    return Instance.get(`${tmcTypesUrl}/${tmcId}`);
  }

  static async updateTmcType(tmcId, tmc) {
    return Instance.put(`${tmcTypesUrl}/${tmcId}`, tmc);
  }

  static async createTmcType(tmc) {
    return Instance.post(tmcTypesUrl, tmc);
  }
}
