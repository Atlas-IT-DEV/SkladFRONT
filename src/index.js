import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";

const theme = extendBaseTheme({
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraBaseProvider theme={theme}>
    <App />
  </ChakraBaseProvider>
);
