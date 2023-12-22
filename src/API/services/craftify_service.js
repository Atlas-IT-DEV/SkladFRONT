import { Instance } from "../instance";
import { craftifyUrl } from "../apiConsts";

export default class CraftifyService {
  static async getCraftifies() {
    return Instance.get(craftifyUrl);
  }
  static async getCraftify(craftifyId) {
    return Instance.get(`${craftifyUrl}/${craftifyId}`);
  }

  static async updateCraftify(craftifyId, craftify) {
    return Instance.put(`${craftifyUrl}/${craftifyId}`, craftify);
  }

  static async createCraftify(craftify) {
    return Instance.post(craftifyUrl, craftify);
  }
}
