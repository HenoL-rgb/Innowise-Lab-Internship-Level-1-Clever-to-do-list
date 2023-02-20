import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import userSlice, { setUser } from "../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "../components/Form";

export default function Sign() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleLogin(email: string, password: string) {
    const auth = getAuth();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((accessToken) => {
          dispatch(setUser({
            email: user.email,
            id: user.uid,
            token: accessToken,
          }));
          navigate("/");
        });
      })
      .catch();
  }

  return (
    <>
      <h1>Sign up</h1>
      <Form title="sign up" handleClick={handleLogin} />
      <Link to="/">Login</Link>
    </>
  );
}
