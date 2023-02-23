import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setUser } from "../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../components/Form";
import { Bars } from "react-loader-spinner";
import { LoaderWrapper, LoginWrapper } from "./styles/LoginStyles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const notify = () =>
    toast.error("Incorrect data!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function handleLoader() {
    setLoader(!loader);
  }

  function handleLogin(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
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
      .catch((error) => {
        notify();
        setLoader(false);
        navigate("/login");
      });
    return;
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
    <LoginWrapper>
      
      <div>
        <h1>Sign in</h1>
        <Form
          title="sign in"
          handleClick={handleLogin}
          setLoader={handleLoader}
        />
        <Link to="/sign">Register</Link>
      </div>
    </LoginWrapper>
  );
}
