import { Instance } from "./instance";

export default class MaterialService {
  static async getMaterials(warehouseId, currentPage, currentPageSize) {
    const params = {
      page: currentPage,
      size: currentPageSize,
      warehouseId: warehouseId,
    };
    return Instance.get("/api/materials", {
      params,
    });
  }
  static async getMaterial(materialId) {
    return Instance.get(`api/materials/${materialId}`);
  }
  static async deleteMaterial(materialId) {
    return Instance.delete(`/api/materials/${materialId}`);
  }

  static async updateMaterial(materialId, data) {
    return Instance.put(`api/materials/${materialId}`, data, {
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    });
  }

  static async createMaterial(data) {
    return Instance.post("api/materials", data, {
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    });
  }
}
