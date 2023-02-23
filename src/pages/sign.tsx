import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setUser } from "../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "../components/Form";
import { Bars } from "react-loader-spinner";
import { LoaderWrapper, SignWrapper } from "./styles/SignStyles";

export default function Sign() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  function handleLoader() {
    setLoader(!loader);
  }

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

  return loader ? (
    <LoaderWrapper>
      <Bars
        height="80"
        width="80"
        color="#fc6722"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrapper>
  ) : (
    <SignWrapper>
      <div>
        <h1>Sign up</h1>
        <Form
          title="sign up"
          handleClick={handleLogin}
          setLoader={handleLoader}
        />
        <Link to="/">Login</Link>
      </div>
    </SignWrapper>
  );
}
