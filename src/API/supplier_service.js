import { Instance } from "./instance";

export default class SupplierService {
  static async getSuppliers() {
    return Instance.get("api/contractors");
  }
}
