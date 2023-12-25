import { Instance } from "../instance";
import { deliveryPlacesUrl } from "../apiConsts";

export default class DeliveryPlaceService {
  static async getDeliveryPlaces() {
    return Instance.get(deliveryPlacesUrl);
  }
  static async getDeliveryPlace(deliveryPlaceId) {
    return Instance.get(`${deliveryPlacesUrl}/${deliveryPlaceId}`);
  }

  static async updateDeliveryPlace(deliveryPlaceId, deliveryPlace) {
    return Instance.put(
      `${deliveryPlacesUrl}/${deliveryPlaceId}`,
      deliveryPlace,
    );
  }

  static async createDeliveryPlace(deliveryPlace) {
    return Instance.post(deliveryPlacesUrl, deliveryPlace);
  }
}
