import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setUser } from "../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "../components/Form";
import styled from "styled-components";

const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  & div {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    align-items: center;
  }
`;
export default function Sign() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleLogin(email: string, password: string) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((accessToken) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: accessToken,
            })
          );
          navigate("/");
        });
      })
      .catch();
  }

  return (
    <SignWrapper>
      <div>
        <h1>Sign up</h1>
        <Form title="sign up" handleClick={handleLogin} />
        <Link to="/">Login</Link>
      </div>
    </SignWrapper>
  );
}
