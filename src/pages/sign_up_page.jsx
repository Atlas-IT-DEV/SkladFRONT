import React, { useEffect, useState } from "react";
import { Button, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import WarehouseService from "../API/services/warehouse_service";
import UserService from "../API/services/user_service";
import FormikSelect from "../components/UI/formik_select";

const SignUpPage = () => {
  const roles = [
    { label: "Администратор", value: "ADMIN" },
    { label: "Ответственный за склад", value: "WAREHOUSE_RESPONSIBLE" },
    { label: "Мастер", value: "MASTER" },
    { label: "Менеджер", value: "MANAGER" },
    { label: "Дизайнер", value: "DESIGNER" },
  ];

  const validate = (values) => {
    const errors = {};

    if (!values.login) {
      errors.login = "Required";
    } else if (values.login.length > 15) {
      errors.login = "Must be 15 characters or less";
    }
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.passwordConfirm || values.passwordConfirm !== values.password) {
      errors.passwordConfirm = "Required";
    }
    if (
      !values.role ||
      roles.find((item) => item === values.role) !== undefined
    ) {
      errors.role = "Required";
    }
    if (values.role === "MASTER" || values.role === "WAREHOUSE_RESPONSIBLE") {
      if (values.warehouseId < 0) {
        errors.warehouseId = "Required";
      }
    }

    return errors;
  };
  const signUp = async (values) => {
    try {
      await UserService.signUp(values);
      alert("Пользователь зарегистрирован");
    } catch (error) {
      console.error("Error signUp:", error);
      alert("Ошибка при регистрации");
    }
  };
  const formik = useFormik({
    initialValues: {
      login: "",
      username: "",
      password: "",
      passwordConfirm: "",
      role: "",
      warehouseId: 0,
    },
    validate,
    onSubmit: (values) => {
      signUp(values);
    },
  });

  const [warehousesList, setWarehousesList] = useState([]);

  const getWarehouses = async () => {
    try {
      const response = await WarehouseService.getWarehouses();
      setWarehousesList(
        response.data.map((warehouse) => {
          return {
            value: warehouse.id,
            label: warehouse.name,
          };
        })
      );
    } catch (error) {
      console.error("Error getWarehouses:", error);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  return (
    <VStack minH="100vh" align="center" justify="center">
      <VStack spacing="15px" align="center" border>
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid minW="300px" spacing={5}>
            <Input
              id="login"
              name="login"
              placeholder="Логин"
              onChange={formik.handleChange}
              value={formik.values.login}
            />
            {formik.errors.login && formik.touched.login ? (
              <Text>{formik.errors.login} </Text>
            ) : null}
            <Input
              id="username"
              name="username"
              placeholder="Имя"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username && formik.touched.username ? (
              <Text>{formik.errors.username}</Text>
            ) : null}
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <Text>{formik.errors.password}</Text>
            ) : null}
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="Повторите пароль"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            />
            {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (
              <Text>{formik.errors.passwordConfirm}</Text>
            ) : null}
            <FormikSelect
              // width={"100%"}
              options={roles}
              onChange={(e) => {
                formik.setFieldValue("role", e.value);
              }}
              placeholder="Роль"
              // fontSize={["14px", "14px", "16px", "16px", "16px"]}
            ></FormikSelect>
            {formik.values.role === "MASTER" ||
            formik.values.role === "WAREHOUSE_RESPONSIBLE" ? (
              <>
                <FormikSelect
                  options={warehousesList}
                  onChange={(e) => {
                    formik.setFieldValue("warehouseId", e.value);
                  }}
                  placeholder={"Склады"}
                />
                {formik.errors.warehouseDTO && formik.touched.warehouseDTO ? (
                  <Text>{formik.errors.warehouseDTO}</Text>
                ) : null}
              </>
            ) : (
              <></>
            )}
            <Button type="submit" variant="menu_yellow">
              Создать
            </Button>
          </SimpleGrid>
        </form>
      </VStack>
    </VStack>
  );
};

export default SignUpPage;
