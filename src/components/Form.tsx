import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

type formProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
};

export default function Form({ title, handleClick }: formProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit(data: any) {
    handleClick(data.email, data.password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Invalid email",
        })}
      />
      <input type="password" {...register("password")} />
      <input type="submit" value="Submit" />
    </form>
  );
}
