import { Instance } from "../instance";
import { deliveryMethodsUrl } from "../apiConsts";

export default class DeliveryMethodService {
  static async getDeliveryMethods() {
    return Instance.get(deliveryMethodsUrl);
  }
  static async getDeliveryMethod(deliveryMethodId) {
    return Instance.get(`${deliveryMethodsUrl}/${deliveryMethodId}`);
  }

  static async updateDeliveryMethod(deliveryMethodId, deliveryMethod) {
    return Instance.put(
      `${deliveryMethodsUrl}/${deliveryMethodId}`,
      deliveryMethod,
    );
  }

  static async createDeliveryMethod(deliveryMethod) {
    return Instance.post(deliveryMethodsUrl, deliveryMethod);
  }
}
