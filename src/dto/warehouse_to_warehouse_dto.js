export default class WarehouseToWarehouseDto {
  constructor(args) {
    this.currentWarehouseId = args.currentWarehouseId;
    this.newWarehouseId = args.newWarehouseId;
    this.materialId = args.materialId;
    this.purchaseId = args.purchaseId;
    this.count = args.count;
  }
}
