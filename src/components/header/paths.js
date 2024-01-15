import { deleteUser } from "../../API/helper/userCookie";

const roles = {
  ADMIN: "ADMIN",
  WAREHOUSE_RESPONSIBLE: "WAREHOUSE_RESPONSIBLE",
  MASTER: "MASTER",
  MANAGER: "MANAGER",
  DESIGNER: "DESIGNER",
};
const allRoles = new Set([
  "ADMIN",
  "WAREHOUSE_RESPONSIBLE",
  "MASTER",
  "MANAGER",
  "DESIGNER",
]);

export const paths = [
  { path: "/", name: "Главная", haveAccess: allRoles },
  { path: "/materials", name: "Материалы", haveAccess: allRoles },
  { path: "/purchases", name: "Закупки", haveAccess: allRoles },
  { path: "/properties", name: "Свойства", haveAccess: allRoles },
  { path: "/craftifies", name: "Способы обработки", haveAccess: allRoles },
  { path: "/tmcs", name: "ТМЦ", haveAccess: allRoles },
  { path: "/tmctypes", name: "Типы тмц", haveAccess: allRoles },
  { path: "/delivery_methods", name: "Способы доставки", haveAccess: allRoles },
  { path: "/delivery_places", name: "Адреса отгрузки", haveAccess: allRoles },
  { path: "/notification_page", name: "Уведомления", haveAccess: allRoles },
  { path: "/warehouse_page", name: "Склады", haveAccess: allRoles },
  { path: "/writeoffs_page", name: "Списания", haveAccess: allRoles },
];

export const authenticationPaths = [
  { path: "/sign_in", name: "Вход", haveAccess: new Set([undefined]) },
  {
    path: "/sign_in",
    name: "Выход",
    onClick: deleteUser,
    haveAccess: allRoles,
  },
  {
    path: "/signup_page",
    name: "Регистрация",
    haveAccess: new Set([roles.ADMIN]),
  },
];

const pathsSave = [
  { path: "/", name: "Главная" },
  { path: "/materials", name: "Материалы" },
  { path: "/purchases", name: "Закупки" },
  { path: "/properties", name: "Свойства" },
  { path: "/craftifies", name: "Способы обработки" },
  { path: "/tmcs", name: "ТМЦ" },
  { path: "/tmctypes", name: "Типы тмц" },
  { path: "/delivery_methods", name: "Способы доставки" },
  { path: "/delivery_places", name: "Адреса отгрузки" },
  { path: "/notification_page", name: "Уведомления" },
  { path: "/warehouse_page", name: "Склады" },
  { path: "/writeoffs_page", name: "Списания" },
  { path: "/signup_page", name: "Регистрация" },
  { path: "/sign_in", name: "Вход" },
];
