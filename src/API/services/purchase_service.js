import { Instance } from "../instance";
import { purchasesUrl } from "../apiConsts";

export default class PurchaseService {
  static async getPurchases(currentPage, currentPageSize) {
    const params = {
      page: currentPage,
      size: currentPageSize,
    };
    return Instance.get(purchasesUrl, {
      params,
    });
  }
  static async getPurchase(purchaseId) {
    return Instance.get(`${purchasesUrl}/${purchaseId}`);
  }
  static async deletePurchase(purchaseId) {
    return Instance.delete(`${purchasesUrl}/${purchaseId}`);
  }

  static async updatePurchase(purchaseId, data) {
    return Instance.put(`${purchasesUrl}/${purchaseId}`, data);
  }

  static async createPurchase(data) {
    return Instance.post(purchasesUrl, data);
  }
}
