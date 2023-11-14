import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  //варианты для различных компонентов
  components: {
    Text: {
      variants: {
        side_menu_hover: {
          color: "menu_gray",
          _hover: {
            color: "white",
          },
        },
      },
    },
    Button: {
      variants: {
        menu_yellow: {
          border: "2px solid",
          borderColor: "main_yellow",
          borderRadius: '0',
          background: "transparent",
          _hover: {
            backgroundColor: "main_yellow",
          },
        },
        menu_red: {
          border: "2px solid",
          borderColor: "main_red",
          borderRadius: '0',
          background: "transparent",
          _hover: {
            backgroundColor: "main_red",
          },
        },
      },
    },
  },
  colors: {
    menu_gray: "#CCC3C2",
    dark: "#333",
    light_dark: "#666",
    main_yellow: "#FFBF00",
    main_red: '#FF0F00'
  },
});

export default theme;
