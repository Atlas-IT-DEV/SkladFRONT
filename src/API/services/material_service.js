import { Instance } from "../instance";
import { materialsUrl } from "../apiConsts";

export default class MaterialService {
  static async getMaterials(warehouseId, currentPage, currentPageSize) {
    const params = {
      page: currentPage,
      size: currentPageSize,
      warehouseId: warehouseId,
    };
    return Instance.get(`${materialsUrl}`, {
      params,
    });
  }
  static async getMaterial(materialId, warehouseId) {
    const params = {
      warehouseId,
    };
    return Instance.get(`${materialsUrl}/${materialId}`, {
      params,
    });
  }

  static async updateMaterial(materialId, material) {
    return Instance.put(`${materialsUrl}/${materialId}`, material, {
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    });
  }

  static async createMaterial(material) {
    return Instance.post(materialsUrl, material, {
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    });
  }
}
