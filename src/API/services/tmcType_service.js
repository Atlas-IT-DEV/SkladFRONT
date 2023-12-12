import { Instance } from "../instance";
import { tmcTypesUrl } from "../apiConsts";

export default class TmcTypeService {
  static async getTmcTypes() {
    return Instance.get(tmcTypesUrl);
  }

  static async getTmcType(tmcId) {
    return Instance.get(`${tmcTypesUrl}/${tmcId}`);
  }

  static async deleteTmcType(tmcId) {
    return Instance.delete(`${tmcTypesUrl}/${tmcId}`);
  }

  static async updateTmcType(tmcId, data) {
    return Instance.put(`${tmcTypesUrl}/${tmcId}`, data);
  }

  static async createTmcType(data) {
    return Instance.post(tmcTypesUrl, data);
  }
}
