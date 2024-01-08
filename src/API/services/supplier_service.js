import { Instance } from "../instance";
import { contractorsUrl } from "../apiConsts";
import { getToken } from "../helper/userCookie";

export default class SupplierService {
  static getSuppliers() {
    return Instance.get(contractorsUrl.contractors, {
      headers: { Authorization: getToken() },
    });
  }
  static getSuppliersClients(currentPage, currentPageSize) {
    const params = {
      page: currentPage,
      size: currentPageSize,
    };
    return Instance.get(
      `${contractorsUrl.contractors}/${contractorsUrl.clients}`,
      {
        params,
        headers: { Authorization: getToken() },
      },
    );
  }
}
