import { deleteUser } from "../../API/helper/userCookie";

const roles = {
  ADMIN: "ADMIN",
  WAREHOUSE_RESPONSIBLE: "WAREHOUSE_RESPONSIBLE",
  MASTER: "MASTER",
  MANAGER: "MANAGER",
  DESIGNER: "DESIGNER",
};

export const paths = [
  { path: "/", name: "Главная", haveAccess: new Set(["AUTH"]) },
  { path: "/materials", name: "Материалы", haveAccess: new Set(["AUTH"]) },
  { path: "/purchases", name: "Закупки", haveAccess: new Set(["AUTH"]) },
  { path: "/properties", name: "Свойства", haveAccess: new Set(["AUTH"]) },
  {
    path: "/craftifies",
    name: "Способы обработки",
    haveAccess: new Set(["AUTH"]),
  },
  { path: "/tmcs", name: "ТМЦ", haveAccess: new Set(["AUTH"]) },
  { path: "/tmctypes", name: "Типы тмц", haveAccess: new Set(["AUTH"]) },
  {
    path: "/delivery_methods",
    name: "Способы доставки",
    haveAccess: new Set(["AUTH"]),
  },
  {
    path: "/delivery_places",
    name: "Адреса отгрузки",
    haveAccess: new Set(["AUTH"]),
  },
  {
    path: "/notification_page",
    name: "Уведомления",
    haveAccess: new Set(["AUTH"]),
  },
  { path: "/warehouse_page", name: "Склады", haveAccess: new Set(["AUTH"]) },
  { path: "/writeoffs_page", name: "Списания", haveAccess: new Set(["AUTH"]) },
];

export const authenticationPaths = [
  { path: "/sign_in", name: "Вход", haveAccess: new Set([undefined]) },
  {
    path: "/sign_in",
    name: "Выход",
    onClick: deleteUser,
    haveAccess: new Set(["AUTH"]),
  },
  {
    path: "/signup_page",
    name: "Регистрация",
    haveAccess: new Set([roles.ADMIN]),
  },
];