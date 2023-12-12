import { VStack, Text, Input, Button, FormControl } from "@chakra-ui/react";
import { useFormik } from "formik";

const LoginPage = () => {
  const validate = (values) => {
    const errors = {};

    if (!values.login) {
      errors.firstName = "Required";
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
      alert(JSON.stringify(values, null, 2));
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
              onChange={formik.handleChange}
              value={formik.values.login}
            />
            {formik.errors.login ? <Text>{formik.errors.login} </Text> : null}
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <Text>{formik.errors.password}</Text>
            ) : null}
            <Button type="submit" variant='menu_yellow'>Войти</Button>
          </VStack>
        </form>
      </VStack>
    </VStack>
  );
};
export default LoginPage;
