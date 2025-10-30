import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "First name should be at least 5 charachters")
    .required("user name is required"),
  email: yup
    .string()
    .email()
    .required("Email is required")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least 6 charachters."),
});
export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 charachters."),
  })
  .required();
