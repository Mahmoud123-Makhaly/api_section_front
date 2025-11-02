import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerValidationSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/local/register", data);
      if (res.status === 200) {
        toast.success("you will navigate to the login page after 2 seconds", {
          position: "top-center",
          style: {
            background: "black",
            color: "white",
          },
          duration: 2000,
        });

        setTimeout(() => {
          navigate("/login");
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
        Register to get access!
      </h2>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {REGISTER_FORM.map(({ name, placeholder, type, validation }, index) => (
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
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
