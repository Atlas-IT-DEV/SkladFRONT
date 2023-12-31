import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import UserService from "../API/services/user_service";
import { setUser } from "../API/helper/userCookie";

const SignInPage = () => {
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
  const signIn = async (values) => {
    try {
      const response = await UserService.signIn(values.login, values.password);
      setUser(response.data);
    } catch (error) {
      console.error("Error signIn:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      signIn(values);
    },
  });

  return (
    <VStack minH="100vh" align="center" justify="center">
      <VStack spacing="15px" align="center" border>
        <form onSubmit={formik.handleSubmit}>
          <VStack>
            <Input
              id="login"
              name="login"
              type="login"
              placeholder="Логин"
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
              placeholder="Пароль"
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
  );
};
export default SignInPage;
