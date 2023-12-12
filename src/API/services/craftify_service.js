import { Instance } from "../instance";
import { craftifyUrl } from "../apiConsts";

export default class CraftifyService {
  static async getCraftifies() {
    return Instance.get(craftifyUrl);
  }
  static async getCraftify(craftifyId) {
    return Instance.get(`${craftifyUrl}/${craftifyId}`);
  }
  static async deleteCraftify(craftifyId) {
    return Instance.delete(`${craftifyUrl}/${craftifyId}`);
  }

  static async updateCraftify(craftifyId, data) {
    return Instance.put(`${craftifyUrl}/${craftifyId}`, data);
  }

  static async createCraftify(data) {
    return Instance.post(craftifyUrl, data);
  }
}
