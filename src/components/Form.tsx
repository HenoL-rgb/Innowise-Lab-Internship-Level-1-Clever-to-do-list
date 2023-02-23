import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

type formProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
  setLoader: () => void;
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    width: 100%;
    & input {
        width: 60%;
        padding: 10px 12px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgba(0,0,0,0.1);
        font-size: 16px;
    }
    & input[type="submit"]{
        margin-top: 15px;
        background-color: #fc6722;
        font-size: 18px;
        width: 30%;
        color: white;
        border: 0;
        &:active {
            background-color: #ff8750;
        }
    }
`

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
      <input type="password" {...register("password")} />
      <input type="submit" value="Submit" />
    </StyledForm>
  );
}
