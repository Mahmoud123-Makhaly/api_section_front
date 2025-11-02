import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { LOGIN_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useState } from "react";
interface IFormInput {
  identifier: string;
  password: string;
}
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/local", data);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      if (res.status === 200) {
        toast.success("you will navigate to the home page after 2  seconds", {
          position: "top-center",
          style: {
            background: "black",
            color: "white",
          },
          duration: 2000,
        });
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;

      toast.error(errorObj.response?.data.error.message as string, {
        position: "top-center",
        style: {
          background: "black",
          color: "white",
        },
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {LOGIN_FORM.map(({ type, placeholder, name, validation }, index) => (
          <div key={index}>
            <Input
              type={type}
              placeholder={placeholder}
              {...register(name, validation)}
            />
            {errors[name] && <InputErrorMessage msg={errors[name].message} />}
          </div>
        ))}

        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
