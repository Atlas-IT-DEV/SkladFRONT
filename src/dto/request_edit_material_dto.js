// export default class RequestEditMaterialDto {
//   constructor(args) {
//     this.name = args?.name || "";
//     this.comment = args?.comment || "";
//     this.tmCraftifyIdList =
//       args?.tmCraftifies?.map((craftify) => {
//         return {
//           value: craftify.id,
//           name: craftify.name,
//         };
//       }) || [];
//     this.materialPropertyDTOList =
//       propertiesToMap(args?.properties) || new Map();
//     this.show = args?.show || true;
//     this.trim = args?.trim || true;
//   }
// }
