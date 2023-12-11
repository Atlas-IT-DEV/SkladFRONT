import { Instance } from "./instance";

export default class DeliveryMethodService {
  static async getDeliveryMethods() {
    return Instance.get("api/delivery_methods");
  }
}
