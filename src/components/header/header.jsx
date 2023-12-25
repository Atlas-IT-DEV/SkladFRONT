import {
  Button,
  HStack,
  Image,
  Link,
  useColorMode,
  VStack,
  Stack,
} from "@chakra-ui/react";
import chevronLeft from "../../images/chevron-left.svg";
import chevronLDown from "../../images/chevron-down.svg";
import starbucks from "../../images/starbucks.svg";
import logo from "./../../images/Logotype.svg";
import { useNavigate } from "react-router";
import useWindowDimensions from "../../hooks/window_dimensions";
const Header = ({ title }) => {
  const { width, height } = useWindowDimensions();
  const navigate = useNavigate();
  return (
    <Stack
      bg="white"
      justifyContent="space-between"
      align="center"
      minHeight="58px"
      width="100%"
      paddingLeft={["10px", "15px", "20px", "25px", "30px"]}
      paddingRight={["10px", "15px", "20px", "25px", "30px"]}
      paddingTop={5}
      paddingBottom={5}
      boxShadow="0px 0px 25px 0px rgba(0, 0, 0, 0.10)"
      direction={width >= 1280 ? "row" : "column"}
      spacing="20px"
    >
      <Image src={logo} />
      {width >= 1280 ? (
        <HStack spacing={5}>
          <HStack variant="menu_yellow_hover">
            <Link
              onClick={() => {
                navigate("/");
              }}
              variant="light_gray"
            >
              Поставщики
            </Link>
          </HStack>
          <HStack>
            <Link
              onClick={() => {
                navigate("/materials");
              }}
              variant="light_gray"
            >
              Материалы
            </Link>
          </HStack>
          <HStack>
            <Link
              onClick={() => {
                navigate("/purchases");
              }}
              variant="light_gray"
            >
              Закупки
            </Link>
          </HStack>
          <HStack>
            <Link
              onClick={() => {
                navigate("/properties");
              }}
              variant="light_gray"
            >
              Свойства
            </Link>
          </HStack>
          <HStack>
            <Link
              onClick={() => {
                navigate("/craftifies");
              }}
              variant="light_gray"
            >
              Способы обработки
            </Link>
          </HStack>
          <HStack>
            <Link
              onClick={() => {
                navigate("/tmcs");
              }}
              variant="light_gray"
            >
              ТМЦ
            </Link>
          </HStack>
          <HStack>
            <Link
              onClick={() => {
                navigate("/tmctypes");
              }}
              variant="light_gray"
            >
              Типы тмц
            </Link>
          </HStack>
          <HStack>
            <Link variant="light_gray">Перемещения</Link>
          </HStack>
          <HStack>
            <Link variant="light_gray">Доступ</Link>
          </HStack>
        </HStack>
      ) : (
        <VStack spacing="20px">
          <HStack spacing="15px">
            <HStack variant="menu_yellow_hover">
              <Link
                onClick={() => {
                  navigate("/");
                }}
                variant="light_gray"
              >
                Поставщики
              </Link>
            </HStack>
            <HStack>
              <Link
                onClick={() => {
                  navigate("/materials");
                }}
                variant="light_gray"
              >
                Материалы
              </Link>
            </HStack>
            <HStack>
              <Link
                onClick={() => {
                  navigate("/purchases");
                }}
                variant="light_gray"
              >
                Закупки
              </Link>
            </HStack>
            <HStack>
              <Link
                onClick={() => {
                  navigate("/properties");
                }}
                variant="light_gray"
              >
                Свойства
              </Link>
            </HStack>
          </HStack>
          <HStack spacing="15px">
            <HStack>
              <Link
                onClick={() => {
                  navigate("/tmcs");
                }}
                variant="light_gray"
              >
                ТМЦ
              </Link>
            </HStack>
            <HStack>
              <Link
                onClick={() => {
                  navigate("/tmctypes");
                }}
                variant="light_gray"
              >
                Типы тмц
              </Link>
            </HStack>
            <HStack>
              <Link variant="light_gray">Перемещения</Link>
            </HStack>
            <HStack>
              <Link variant="light_gray">Доступ</Link>
            </HStack>
          </HStack>
        </VStack>
      )}
      <Image src={starbucks} borderRadius="50%" border="2px solid #FFBF00" />
    </Stack>
  );
};

export default Header;
