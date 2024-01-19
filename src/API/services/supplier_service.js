import { Instance } from "../instance";
import { contractorsUrl } from "../apiConsts";
import { getToken } from "../helper/userCookie";

export default class SupplierService {
  static getSuppliers() {
    return Instance.get(contractorsUrl.contractors, {
      headers: { Authorization: getToken() },
    });
  }
  static getSuppliersClients(page, size, search, onlyClients = false) {
    const params = {
      page,
      size,
      search,
      onlyClients,
    };
    return Instance.get(`${contractorsUrl.contractors}`, {
      params,
      headers: { Authorization: getToken() },
    });
  }
}
