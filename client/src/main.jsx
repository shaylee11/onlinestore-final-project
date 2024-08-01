import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/home/HomePage.jsx';
import SignupPage from './pages/signup/SignupPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import AuthProvider from './context/authContext.jsx';
import MyCart from './pages/myCart/MyCart.jsx';
import CardProvider from './context/cardContext.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';
import About from './pages/about/About.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/myCart",
        element: <MyCart />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CardProvider>
        <RouterProvider router={router} />
      </CardProvider>
    </AuthProvider>
  </React.StrictMode>,
)
