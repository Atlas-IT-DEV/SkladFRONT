import { Instance } from "./instance";

export default class PurchaseService {
  static async getPurchases(currentPage, currentPageSize) {
    const params = {
      page: currentPage,
      size: currentPageSize,
    };
    return Instance.get("/api/purchases", {
      params,
    });
  }
  static async getPurchase(purchaseId) {
    return Instance.get(`api/purchases/${purchaseId}`);
  }
  static async deletePurchase(purchaseId) {
    return Instance.delete(`/api/purchases/${purchaseId}`);
  }

  static async updatePurchase(purchaseId, data) {
    return Instance.put(`api/purchases/${purchaseId}`, data);
  }

  static async createPurchase(data) {
    return Instance.post("api/purchases", data);
  }
}
