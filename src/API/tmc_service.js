import { Instance } from "./instance";

export default class TmcService {
  static async getTmcs() {
    return Instance.get("api/tmcs");
  }

  static async getTmc(tmcId) {
    return Instance.get(`/api/tmcs/${tmcId}`);
  }

  static async deleteTmc(tmcId) {
    return Instance.delete(`/api/tmcs/${tmcId}`);
  }

  static async updateTmc(tmcId, data) {
    return Instance.put(`api/tmcs/${tmcId}`, data);
  }

  static async createTmc(data) {
    return Instance.post("api/tmcs", data);
  }
}
