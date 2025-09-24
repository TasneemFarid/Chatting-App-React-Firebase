import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AuthLayout from './components/layouts/AuthLayout';
import Login from './pages/Login';
import Signin from './pages/Signin';
import MainLayout from './components/layouts/MainLayout';
import Home from './pages/Home';
import firebaseConfig from './Firebase/firebaseConfig';

const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "signin", Component: Signin },
    ],
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
