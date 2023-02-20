import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setUser } from "../store/slices/userSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import Form from "../components/Form";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      .catch();
    return;
  }

  return (
    <>
      <h1>Sign in</h1>
      <Form title="sign in" handleClick={handleLogin} />
      <Link to="/sign">Register</Link>
    </>
  );
}
