import { Instance } from "../instance";
import { warehousesUrl } from "../apiConsts";

export default class WarehouseService {
  static async getWarehouses() {
    return Instance.get(warehousesUrl.warehouses);
  }

  static async getWarehouse(warehouseId) {
    return Instance.get(`${warehousesUrl.warehouses}/${warehouseId}`);
  }

  static async updateWarehouse(warehouseId, warehouse) {
    return Instance.put(
      `${warehousesUrl.warehouses}/${warehouseId}`,
      warehouse,
    );
  }

  static async createWarehouse(warehouse) {
    return Instance.post(warehousesUrl.warehouses, warehouse);
  }

  static async addMaterialToWarehouse(warehouseId, materialTransfer) {
    return Instance.put(
      `${warehousesUrl.warehouses}/${warehouseId}/${warehousesUrl.update}`,
      materialTransfer,
    );
  }

  static async moveMaterial(warehouseId, newWarehouseId, materialTransfer) {
    return Instance.put(
      `${warehousesUrl.warehouses}/${warehouseId}/${warehousesUrl.move}/${newWarehouseId}`,
      materialTransfer,
    );
  }
}
