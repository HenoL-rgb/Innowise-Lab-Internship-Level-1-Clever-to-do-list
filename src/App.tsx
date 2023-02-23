import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Tassker from "./pages/Tassker";
import Header from "./components/Header";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import { Outlet } from "react-router";
import Sign from "./pages/Sign";
import Login from "./pages/Login";
import Task from "./pages/Task";
import { useAuth } from "./hooks/useAuth";

const AppWrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 762px;
  height: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 30px 30px;
  border-radius: 15px;
  row-gap: 30px;
  margin-top: 30px;
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
  const { isAuth } = useAuth();
  return (
    <AppWrapper>
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
