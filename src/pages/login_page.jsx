import { Button, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import Header from "../components/header/header";
import React from "react";
import UserService from "../API/services/user_service";

const LoginPage = () => {
  const validate = (values) => {
    const errors = {};

    if (!values.login) {
      errors.login = "Required";
    } else if (values.login.length > 15) {
      errors.login = "Must be 15 characters or less";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      UserService.signIn(values.login, values.password);
    },
  });

  return (
    <Stack
      direction={"column"}
      height="100vh"
      spacing="0"
      backgroundColor="menu_white"
      width="100%"
    >
      <Header />
      <VStack minH="100vh" align="center" justify="center">
        <VStack spacing="15px" align="center" border>
          <form onSubmit={formik.handleSubmit}>
            <VStack>
              <Input
                id="login"
                name="login"
                type="login"
                onChange={formik.handleChange}
                value={formik.values.login}
              />
              {formik.errors.login && formik.touched.login ? (
                <Text>{formik.errors.login} </Text>
              ) : null}
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <Text>{formik.errors.password}</Text>
              ) : null}
              <Button type="submit" variant="menu_yellow">
                Войти
              </Button>
            </VStack>
          </form>
        </VStack>
      </VStack>
    </Stack>
  );
};
export default LoginPage;
