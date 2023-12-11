export default class EditMaterialDto {
  constructor(args) {
    this.name = args?.name || "";
    this.comment = args?.comment || "";
    this.tmCraftifyIdList =
      args?.tmCraftifies?.map((craftify) => {
        return {
          id: craftify.id,
          name: craftify.name,
        };
      }) || [];
    this.materialPropertyDTOList =
      propertiesToMap(args?.properties) || new Map();
    this.show = args?.show === true;
  }
}

const propertiesToMap = (properties) => {
  const materialPropertyDTOList = new Map();
  properties?.forEach((obj) => {
    if (obj.value === "true" || obj.value === "false") {
      materialPropertyDTOList.set(obj.property.id, obj.value === "true");
    } else {
      materialPropertyDTOList.set(obj.property.id, obj.value);
    }
  });
  return materialPropertyDTOList;
};
