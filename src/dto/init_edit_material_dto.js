export default class InitEditMaterialDto {
  constructor(args) {
    this.name = "";
    this.comment = "";
    this.tmCraftifyIdList = [];
    this.materialPropertyDTOList = new Map();
    this.show = true;
    this.trim = true;
  }
}
