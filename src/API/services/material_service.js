import { Instance } from "../instance";
import { materialsUrl } from "../apiConsts";
import { getToken } from "../helper/userCookie";

export default class MaterialService {
  static getMaterials(warehouseId, currentPage, currentPageSize) {
    const params = {
      page: currentPage,
      size: currentPageSize,
      warehouseId: warehouseId,
    };
    return Instance.get(`${materialsUrl}`, {
      params,
      headers: { Authorization: getToken() },
    });
  }
  static getMaterial(materialId, warehouseId) {
    const params = {
      warehouseId,
    };
    return Instance.get(`${materialsUrl}/${materialId}`, {
      params,
      headers: { Authorization: getToken() },
    });
  }

  static updateMaterial(materialId, material) {
    return Instance.put(`${materialsUrl}/${materialId}`, material, {
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: getToken(),
      },
    });
  }

  static createMaterial(material) {
    return Instance.post(materialsUrl, material, {
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: getToken(),
      },
    });
  }

  static searchMaterial(
    currentPage,
    currentPageSize,
    warehouseId,
    searchString,
  ) {
    const params = {
      page: currentPage,
      size: currentPageSize,
      warehouseId: warehouseId,
      search: searchString,
    };
    return Instance.get(`${materialsUrl}`, {
      params,
      headers: { Authorization: getToken() },
    });
  }
}
