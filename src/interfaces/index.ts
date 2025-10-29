// export interface IRegisterInput {
//   name: "email" | "username" | "password";
//   placeholder: string;
//   type: string;
//   validation: {
//     required?: boolean;
//     minLength?: number;
//     pattern?: RegExp;
//   };
// }
export interface IRegisterInput {
  type: string;
  name: "username" | "email" | "password";
  placeholder: string;
  validation: {
    required?: string;
    minLength?: number;
    pattern?: RegExp;
  };
}
export interface ILoginInput {
  name: "identifier" | "password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface ITodo {
  id: number;
  title: string;
  description: string;
}
