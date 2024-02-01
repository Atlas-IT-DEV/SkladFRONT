export const materialPropertyDTOListToArray = (materialPropertyDTOList) => {
  return Array.from(materialPropertyDTOList.entries(), ([key, value]) => ({
    propertyId: key,
    value,
  }));
};

export const mapPropertiesValidationToArray = (map) => {
  return Array.from(map.values());
};

export const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};
