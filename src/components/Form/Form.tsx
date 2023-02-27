import React from "react";
import { useForm } from "react-hook-form";
import { StyledForm } from "./FormStyles";

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
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Invalid email",
        })}
        type='email'
      />
      {errors.email && <span>{errors.email.message?.toString()}</span>}

      <input
        {...register("password", {
          required: "Invalid password",
        })}
        type='password'
      />
      {errors.password && <span>{errors.password.message?.toString()}</span>}

      <input type='submit' value='Submit'/>
    </StyledForm>
  );
}
