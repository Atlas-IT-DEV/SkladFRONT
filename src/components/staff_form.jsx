import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { name, value, onChange, onBlur } = field;
  const { touched, error } = meta;
  return (
    <FormControl isInvalid={touched && error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;

import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { Box, Button, Flex, Heading, IconButton, Stack } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import CustomInput from "./CustomInput";

const validationSchema = Yup.object().shape({
  workers: Yup.array()
    .of(
      Yup.object().shape({
        position: Yup.string().required("Обязательное поле"),
        email: Yup.string().email("Неверный формат почты").required("Обязательное поле"),
        phone: Yup.string().matches(/^\+?\d{10,12}$/, "Неверный формат телефона").required("Обязательное поле"),
        fullName: Yup.string().required("Обязательное поле"),
      })
    )
    .min(1, "Добавьте хотя бы одного работника"),
});

const App = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Форма на react chakra ui formik</Heading>
      <Formik
        initialValues={{ workers: [{ position: "", email: "", phone: "", fullName: "" }] }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Отправка формы с данными:", values);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, isValid }) => (
          <Form>
            <FieldArray name="workers">
              {({ push, remove }) => (
                <Stack spacing={4}>
                  {values.workers.map((worker, index) => (
                    <Box key={index} p={4} border="1px" borderColor="gray.200" rounded="md">
                      <Flex justify="space-between" align="center" mb={2}>
                        <Heading size="sm">Работник #{index + 1}</Heading>
                        {values.workers.length > 1 && (
                          <IconButton
                            aria-label="Удалить работника"
                            icon={<CloseIcon />}
                            onClick={() => remove(index)}
                          />
                        )}
                      </Flex>
                      <Stack spacing={4}>
                        <CustomInput
                          name={`workers.${index}.position`}
                          label="Должность"
                          placeholder="Введите должность"
                        />
                        <CustomInput
                          name={`workers.${index}.email`}
                          label="Почта"
                          placeholder="Введите почту"
                          type="email"
                        />
                        <CustomInput
                          name={`workers.${index}.phone`}
                          label="Телефон"
                          placeholder="Введите телефон"
                          type="tel"
                        />
                        <CustomInput
                          name={`workers.${index}.fullName`}
                          label="ФИО"
                          placeholder="Введите ФИО"
                        />
                      </Stack>
                    </Box>
                  ))}
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="purple"
                    onClick={() => push({ position: "", email: "", phone: "", fullName: "" })}
                  >
                    Добавить работника
                  </Button>
                </Stack>
              )}
            </FieldArray>
            <Button
              type="submit"
              colorScheme="purple"
              mt={4}
              width="full"
              disabled={isSubmitting || !isValid}
            >
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default App;
