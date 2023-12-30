import Cookies from "js-cookie";

export const getToken = () => {
  return `Bearer ${Cookies.get("token")}`;
};

export const getRole = () => {
  return Cookies.get("role");
};

export const setUser = (user) => {
  console.log(Cookies.get("token"));
  console.log(user);
  Cookies.set("token", user.token, { expires: 365 ** 2 });
  Cookies.set("role", user.role, { expires: 365 ** 2 });
  console.log(Cookies.get("token"));
};

export const deleteUser = () => {
  Cookies.remove("token");
  Cookies.remove("role");
};
