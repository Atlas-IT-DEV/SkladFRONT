import { HStack, Image, Text } from "@chakra-ui/react";
import up from "./../images/up.svg";

const Footer = () => {
  return (
    <HStack position='relative'
      bottom='0px'
      backgroundColor="#E9D8CC"
      width="100%"
      minHeight={["60px", "70px", "80px", "90px", "100px"]}
      padding={["10px", "12px", "15px", "20px", "25px"]}
    >
      <HStack justify="space-between" width="100%" align="center">
        <Text color="light_dark">Дизайн студия RICO DESIGN © 1995–2023</Text>
        <HStack
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Text color="light_dark">Вверх страницы</Text>
          <Image src={up} />
        </HStack>
      </HStack>
    </HStack>
  );
};
export default Footer;
