import { Instance } from "./instance";

export default class PropertyService {
  static async getProperties() {
    return Instance.get("/api/properties");
  }

  static async getProperty(propertyId) {
    return Instance.get(`/api/properties/${propertyId}`);
  }

  static async deleteProperty(propertyId) {
    return Instance.delete(`/api/properties/${propertyId}`);
  }

  static async updateProperty(propertyId, data) {
    return Instance.put(`api/properties/${propertyId}`, data);
  }

  static async createProperty(data) {
    return Instance.post("api/properties", data);
  }
}
