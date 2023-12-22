import { Instance } from "../instance";
import { warehousesUrl } from "../apiConsts";

export default class WarehouseService {
  static async getWarehouses() {
    return Instance.get(warehousesUrl);
  }
}
