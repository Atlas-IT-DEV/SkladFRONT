import {
  Button,
  HStack,
  Image,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import chevronLeft from "../../images/chevron-left.svg";
import bell from "../../images/bell.svg";
import bellActiveSvg from "../../images/bell-active.svg";
import chevronLDown from "../../images/chevron-down.svg";
import starbucks from "../../images/starbucks.svg";
import styles from "./header.module.css";
import { useState } from "react";

const Header = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [bellActive, setBellActive] = useState(false);
  const [dropdawn, setDropDawn] = useState("");

  return (
    <HStack
      bg="white"
      justifyContent="space-between"
      minHeight="50px"
      width="100%"
    >
      <HStack spacing="16px" ps="13px">
        <Image
          className={styles.Header__Icon}
          src={chevronLeft}
          w="24px"
          h="24px"
        />
        <Text fontSize="14px" fontStyle="normal" fontWeight="400">
          {title}
        </Text>
      </HStack>

      <HStack spacing="20px" pr="10px">
        {/* <Image
          src={moon}
          w="24px"
          h="24px"
          className={styles.Header__Icon}
          onClick={toggleColorMode}
        /> */}
        <Image
          src={bellActive ? bell : bellActiveSvg}
          w="24px"
          h="24px"
          className={styles.Header__Icon}
          onClick={() => {
            setBellActive((prev) => !prev);
          }}
        />
        <HStack spacing="10px" ps="5px" pr="5px">
          <Image src={starbucks} w="30px" h="30px" onClick={() => {}} />
          <Text
            fontSize={[13, 13, 14, 14, 14]}
            fontStyle="normal"
            fontWeight="700"
          >
            Арнольт Шварценгольт
          </Text>
          <Image
            src={chevronLDown}
            w="24px"
            h="24px"
            className={styles.Header__Icon}
            onClick={() => {
              setDropDawn(
                <VStack position={"relative"} top="50px">
                  <Button>Профиль</Button>
                  <Button>Настройки</Button>
                </VStack>,
              );
            }}
          />
          {dropdawn}
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Header;
