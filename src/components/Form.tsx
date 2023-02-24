import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorStyle } from "../pages/styles/TaskStyles";
import { formProps } from "../types/types";
import { StyledForm } from "./styles/FormStyles";

export default function Form({ title, handleClick, setLoader }: formProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit(data: any) {
    handleClick(data.email, data.password);
    setLoader();
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Invalid email",
        })}
      />
      {errors.email && (
        <ErrorStyle>{errors.email.message?.toString()}</ErrorStyle>
      )}
      <input
        type="password"
        {...register("password", { required: "Invalid password" })}
      />
      {errors.password && <ErrorStyle>{errors.password.message?.toString()}</ErrorStyle>}
      <input type="submit" value="Submit" />
    </StyledForm>
  );
}
