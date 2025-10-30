import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../validation";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerValidationSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    console.log("data", data);

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
        <Button fullWidth> Register</Button>
      </form>
    </div>
  );
};

export default Register;
