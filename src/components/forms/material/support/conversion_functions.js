export const materialPropertyDTOListToArray = (materialPropertyDTOList) => {
  return Array.from(materialPropertyDTOList.entries(), ([key, value]) => ({
    propertyId: key,
    value,
  }));
};

export const mapPropertiesValidationToArray = (map) => {
  return Array.from(map.values());
};

export const arrayBufferToBase64 = (arrayBuffer) => {
  return btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );
};

export const base64ToFile = (base64, fileName) => {
  let bstr = atob(base64);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: "image/jpeg" });
};
