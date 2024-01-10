import React, { useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import Header from "./components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import { useCookies } from "react-cookie";
import UserService from "./API/services/user_service";

function Layout() {
  const [cookie, setCookie] = useCookies();
  const getUser = async () => {
    try {
      const response = await UserService.me();

      if (!(response.data.warehouseId === cookie.warehouseId)) {
        console.log(response.data.warehouseId);
        setCookie("warehouseId", response.data.warehouseId);
      } else if (!response.data.role === cookie.role) {
        setCookie("role", response.data.role);
      }
    } catch (e) {
      console.log("Error Layout-getUser");
    }
  };
  useEffect(() => {
    getUser();
  }, [cookie]);
  return (
    <VStack backgroundColor="menu_white" width="100%" height="100vh">
      <Header />
      <Outlet />
      <Footer />
    </VStack>
  );
}

export default Layout;
