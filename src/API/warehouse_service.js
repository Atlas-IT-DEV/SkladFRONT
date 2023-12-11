import { Instance } from "./instance";

export default class WarehouseService {
  static async getWarehouses() {
    return Instance.get("api/warehouses");
  }
}
