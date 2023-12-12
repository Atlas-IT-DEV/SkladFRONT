import { Instance } from "../instance";
import { materialsUrl } from "../apiConsts";

export default class MaterialService {
  static async getMaterials(warehouseId, currentPage, currentPageSize) {
    const params = {
      page: currentPage,
      size: currentPageSize,
      warehouseId: warehouseId,
    };
    return Instance.get(materialsUrl, {
      params,
    });
  }
  static async getMaterial(materialId) {
    return Instance.get(`${materialsUrl}/${materialId}`);
  }
  static async deleteMaterial(materialId) {
    return Instance.delete(`${materialsUrl}/${materialId}`);
  }

  static async updateMaterial(materialId, data) {
    return Instance.put(`${materialsUrl}/${materialId}`, data, {
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    });
  }

  static async createMaterial(data) {
    return Instance.post(materialsUrl, data, {
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    });
  }
}
