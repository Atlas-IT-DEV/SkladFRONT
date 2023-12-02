export default class EditMaterialDto {
  constructor(args) {
    this.name = args.name || null;
    this.comment = args.comment || " ";
    this.tmCraftifyIdList =
      args.tmCraftifies.map((craftify) => craftify.id) || [];
    this.materialPropertyDTOList =
      args.properties.map((property) => {
        return {
          propertyId: property.property.id,
          value: property.value,
        };
      }) || [];
    this.show = args.show;
    this.trim = args.trim || " ";
  }
}
// {
//     "name": "string",
//     "comment": "string",
//     "tmCraftifyIdList": [
//     0
// ],
//     "materialPropertyDTOList": [
//     {
//         "propertyId": 0,
//         "value": "string"
//     }
// ],
//     "show": true,
//     "trim": true
// }
