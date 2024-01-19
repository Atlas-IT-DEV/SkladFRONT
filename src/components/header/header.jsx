import {
  HStack,
  Image,
  Link,
  Stack,
  useDimensions,
  VStack,
} from "@chakra-ui/react";
import starbucks from "../../images/starbucks.svg";
import logo from "./../../images/Logotype.svg";
import { useNavigate } from "react-router";
import useWindowDimensions from "../../hooks/window_dimensions";
import { GoChevronDown } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { deleteUser } from "../../API/helper/userCookie/userCookie";
import { useCookies } from "react-cookie";

const Header = () => {
  const { width, height } = useWindowDimensions();
  const navigate = useNavigate();
  const [modalMenu, setModalMenu] = useState([false, null]);
  const componentRef = useRef(null);
  const dimensions = useDimensions(componentRef, true);
  useEffect(() => {
    if (width >= 966) {
      setModalMenu([false, null]);
    }
  }, [width]);
  const [cookie, setCookie] = useCookies(["token"]);
  return (
    <Stack
      bg="white"
      justifyContent="space-between"
      align="center"
      width="100%"
      paddingLeft={["10px", "15px", "20px", "25px", "30px"]}
      paddingRight={["10px", "15px", "20px", "25px", "30px"]}
      paddingTop={5}
      paddingBottom={5}
      boxShadow="0px 0px 25px 0px rgba(0, 0, 0, 0.10)"
      direction="row"
      spacing="20px"
      ref={componentRef}
    >
      <Image src={logo} />
      {width >= 1920 ? (
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
            <Link
              onClick={() => {
                navigate("/delivery_methods");
              }}
              variant="light_gray"
            >
              Способы доставки
            </Link>
          </HStack>
          <HStack>
            <Link
              onClick={() => {
                navigate("/delivery_places");
              }}
              variant="light_gray"
            >
              Адреса отгрузки
            </Link>
          </HStack>
          <HStack>
            <Link
              onClick={() => {
                navigate("/notification_page");
              }}
              variant="light_gray"
            >
              Уведомления
            </Link>
          </HStack>
          <HStack>
            <Link variant="light_gray">Перемещения</Link>
          </HStack>
          <HStack>
            <Link variant="light_gray">Доступ</Link>
          </HStack>
          {cookie.role === undefined ? (
            <HStack>
              <Link
                onClick={() => {
                  navigate("/sign_in");
                }}
                variant="light_gray"
              >
                Вход
              </Link>
            </HStack>
          ) : (
            <HStack>
              <Link
                onClick={() => {
                  deleteUser();
                }}
                variant="light_gray"
              >
                Выход
              </Link>
            </HStack>
          )}

          <HStack>
            <Link
              onClick={() => {
                navigate("/signup_page");
              }}
              variant="light_gray"
            >
              Регистрация
            </Link>
          </HStack>
        </HStack>
      ) : width >= 966 ? (
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
              <Link
                onClick={() => {
                  navigate("/delivery_methods");
                }}
                variant="light_gray"
              >
                Способы доставки
              </Link>
            </HStack>
            <HStack>
              <Link
                onClick={() => {
                  navigate("/notification_page");
                }}
                variant="light_gray"
              >
                Уведомления
              </Link>
            </HStack>
            <HStack>
              <Link
                onClick={() => {
                  navigate("/delivery_places");
                }}
                variant="light_gray"
              >
                Адреса отгрузки
              </Link>
            </HStack>
            <HStack>
              <Link variant="light_gray">Перемещения</Link>
            </HStack>
            <HStack>
              <Link variant="light_gray">Доступ</Link>
            </HStack>
            {cookie.role === undefined ? (
              <HStack>
                <Link
                  onClick={() => {
                    navigate("/sign_in");
                  }}
                  variant="light_gray"
                >
                  Вход
                </Link>
              </HStack>
            ) : (
              <HStack>
                <Link
                  onClick={() => {
                    deleteUser();
                  }}
                  variant="light_gray"
                >
                  Выход
                </Link>
              </HStack>
            )}
            <HStack>
              <Link
                onClick={() => {
                  navigate("/signup_page");
                }}
                variant="light_gray"
              >
                Регистрация
              </Link>
            </HStack>
          </HStack>
        </VStack>
      ) : null}
      <HStack>
        <Image src={starbucks} borderRadius="50%" border="2px solid #FFBF00" />
        {width <= 966 ? (
          <GoChevronDown
            width="20px"
            onClick={() => {
              let copy = Array.from(modalMenu);
              if (copy[0]) {
                copy[0] = false;
                copy[1] = null;
              } else {
                copy[0] = true;
                copy[1] = (
                  <VStack
                    padding="10px"
                    position="absolute"
                    top={dimensions.borderBox.height}
                    right="0px"
                    zIndex="20"
                    backgroundColor="white"
                  >
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
                      <Link
                        onClick={() => {
                          navigate("/delivery_methods");
                        }}
                        variant="light_gray"
                      >
                        Способы доставки
                      </Link>
                    </HStack>
                    <HStack>
                      <Link
                        onClick={() => {
                          navigate("/delivery_places");
                        }}
                        variant="light_gray"
                      >
                        Адреса отгрузки
                      </Link>
                    </HStack>
                    <HStack>
                      <Link
                        onClick={() => {
                          navigate("/notification_page");
                        }}
                        variant="light_gray"
                      >
                        Уведомления
                      </Link>
                    </HStack>
                    <HStack>
                      <Link variant="light_gray">Перемещения</Link>
                    </HStack>
                    <HStack>
                      <Link variant="light_gray">Доступ</Link>
                    </HStack>
                    {cookie.role === undefined ? (
                      <HStack>
                        <Link
                          onClick={() => {
                            navigate("/sign_in");
                          }}
                          variant="light_gray"
                        >
                          Вход
                        </Link>
                      </HStack>
                    ) : (
                      <HStack>
                        <Link
                          onClick={() => {
                            deleteUser();
                          }}
                          variant="light_gray"
                        >
                          Выход
                        </Link>
                      </HStack>
                    )}
                    <HStack>
                      <Link
                        onClick={() => {
                          navigate("/signup_page");
                        }}
                        variant="light_gray"
                      >
                        Регистрация
                      </Link>
                    </HStack>
                  </VStack>
                );
              }
              setModalMenu(copy);
            }}
          />
        ) : null}
        {modalMenu[1]}
      </HStack>
    </Stack>
  );
};

export default Header;
