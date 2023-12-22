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

  static async updatePurchase(purchaseId, purchase) {
    return Instance.put(`${purchasesUrl}/${purchaseId}`, purchase);
  }

  static async createPurchase(purchase) {
    return Instance.post(purchasesUrl, purchase);
  }
}
