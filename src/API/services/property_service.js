import { Instance } from "../instance";
import { propertiesUrl } from "../apiConsts";

export default class PropertyService {
  static async getProperties() {
    return Instance.get(propertiesUrl);
  }

  static async getProperty(propertyId) {
    return Instance.get(`${propertiesUrl}/${propertyId}`);
  }

  static async updateProperty(propertyId, property) {
    return Instance.put(`${propertiesUrl}/${propertyId}`, property);
  }

  static async createProperty(property) {
    return Instance.post(propertiesUrl, property);
  }
}
