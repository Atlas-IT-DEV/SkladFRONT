import { Instance } from "./instance";

export default class CraftifyService {
  static async getCraftifies() {
    return Instance.get("api/tmcCraftifies");
  }
  static async getCraftify(craftifyId) {
    return Instance.get(`api/tmcCraftifies/${craftifyId}`);
  }
  static async deleteCraftify(craftifyId) {
    return Instance.delete(`/api/tmcCraftifies/${craftifyId}`);
  }

  static async updateCraftify(craftifyId, data) {
    return Instance.put(`api/tmcCraftifies/${craftifyId}`, data);
  }

  static async createCraftify(data) {
    return Instance.post("api/tmcCraftifies", data);
  }
}
