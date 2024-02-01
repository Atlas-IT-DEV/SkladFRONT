export default class MaterialFormTransferDto {
  constructor(materialId, warehouseId) {
    this.warehouseId = warehouseId || "";
    this.materialId = materialId;
    this.purchaseId = "";
    this.count = "";
    this.maxCount = "";
  }
}
