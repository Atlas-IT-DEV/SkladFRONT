import { Instance } from "../instance";
import { propertiesUrl } from "../apiConsts";

export default class PropertyService {
  static async getProperties() {
    return Instance.get(propertiesUrl);
  }

  static async getProperty(propertyId) {
    return Instance.get(`${propertiesUrl}/${propertyId}`);
  }

  static async deleteProperty(propertyId) {
    return Instance.delete(`${propertiesUrl}/${propertyId}`);
  }

  static async updateProperty(propertyId, data) {
    return Instance.put(`${propertiesUrl}/${propertyId}`, data);
  }

  static async createProperty(data) {
    return Instance.post(propertiesUrl, data);
  }
}
