import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "../../components/Form/Form";
import { Bars } from "react-loader-spinner";
import { LoaderWrapper, SignWrapper } from "./SignStyles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Sign() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const notify = (error: string) =>
    toast.error(error, {
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
          localStorage.setItem('userInfo', JSON.stringify({...user, accessToken: accessToken}))
          navigate("/");
        });
      })
      .catch((error) => {
        notify(error.code);
        setLoader(false);
        navigate("/login");
      });
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
