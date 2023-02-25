import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import Tassker from "./pages/Tassker/Tassker";
import Header from "./components/Header/Header";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from "react-router";
import Sign from "./pages/Sign/Sign";
import Login from "./pages/Login/Login";
import Task from "./pages/Task/Task";
import { useAuth } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { themeSettings } from "./themeSetting";
import { useAppDispatch } from "./hooks/redux-hooks";
import { setUser } from "./store/slices/userSlice";

const AppWrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 762px;
  height: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 0 30px 30px;
  border-radius: 15px;
  row-gap: 30px;
  margin-top: 30px;
  background-color: ${themeSettings.app.bg};
  color: ${themeSettings.app.color};
`;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Tassker />} />
      <Route path="/task" element={<Task />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

const publicRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="*" element={<Login />} />
    </Route>
  )
);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const isUser = localStorage.getItem('userInfo');
    if(isUser) {
      dispatch(setUser({...JSON.parse(isUser)}))
    }
  }, [])
  
  const { isAuth } = useAuth();
  return (
    <AppWrapper>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={isAuth ? router : publicRouter} />
    </AppWrapper>
  );
}

function Root() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
