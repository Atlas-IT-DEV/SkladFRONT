export default class MaterialFormTransferDto {
  constructor(materialId) {
    this.warehouseId = "";
    this.materialId = materialId || "";
    this.purchaseId = "";
    this.count = "";
    this.maxCount = "";
  }
}
