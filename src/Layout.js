import React from "react";
import { VStack } from "@chakra-ui/react";
import Header from "./components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

function Layout() {
  return (
    <VStack backgroundColor="menu_white" width="100%" height="100vh">
      <Header />
      <Outlet />
      <Footer />
    </VStack>
  );
}

export default Layout;
