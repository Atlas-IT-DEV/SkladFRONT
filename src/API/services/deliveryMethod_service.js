import { Instance } from "../instance";
import { deliveryMethodsyUrl } from "../apiConsts";

export default class DeliveryMethodService {
  static async getDeliveryMethods() {
    return Instance.get(deliveryMethodsyUrl);
  }
}
