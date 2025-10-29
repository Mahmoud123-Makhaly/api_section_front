import { ILoginInput, IRegisterInput } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    type: "text",
    name: "username",
    placeholder: "userName",
    validation: {
      required: "userName is required",
      minLength: 5,
    },
  },
  {
    type: "email",
    name: "email",
    placeholder: "email address",
    validation: {
      required: "email is required",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    type: "password",
    name: "password",
    placeholder: "password",
    validation: {
      required: "password is required",
      minLength: 6,
    },
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "identifier",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];
