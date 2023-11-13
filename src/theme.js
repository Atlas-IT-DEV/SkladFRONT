import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  //варианты для различных компонентов
  components: {
    Text: {
      variants: {
        side_menu_hover: {
          bg: "red.400",
          _hover: {
            bg: "green.400",
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
  },
});
export default theme;
