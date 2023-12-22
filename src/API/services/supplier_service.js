import { Instance } from "../instance";
import { contractorsUrl } from "../apiConsts";

export default class SupplierService {
  static async getSuppliers() {
    return Instance.get(contractorsUrl);
  }
}
