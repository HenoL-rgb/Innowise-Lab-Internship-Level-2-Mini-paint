import React from "react";
import { useForm } from "react-hook-form";

type formPropsType = {
  handleClick: (email: string, password: string) => void;
}
export default function Form({handleClick}: formPropsType) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    handleClick(data.email, data.password)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Invalid email",
        })}
      />
      {errors.email && <span>{errors.email.message?.toString()}</span>}

      <input
        {...register("password", {
          required: "Invalid password",
        })}
        type='password'
      />
      {errors.password && <span>{errors.password.message?.toString()}</span>}
    </form>
  );
}
