import Cookies from "js-cookie";

export const getToken = () => {
  return `Bearer ${Cookies.get("token")}`;
};

export const getRole = () => {
  return Cookies.get("role");
};

export const setUser = (user) => {
  Cookies.set("token", user.token, { expires: 365 ** 2 });
  Cookies.set("role", user.role, { expires: 365 ** 2 });
  // Cookies.set("warehouseId", user.warehouseId, { expires: 365 ** 2 });
  Cookies.set("warehouseId", 1, { expires: 365 ** 2 });
};

export const deleteUser = () => {
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("warehouseId");
};
