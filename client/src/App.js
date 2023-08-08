import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/pages/auth/register/Register";
import Login from "./components/pages/auth/Login/Login";
import Home from "./components/pages/Home/Home";
import Error_page from "./components/pages/Errors/Error_page";
import { ThemeProvider } from "@material-tailwind/react";
import Post from "./components/pages/auth/Login/Post";
import Profile from "./components/pages/Profile/Profile";
import Header from "./components/pages/Layout/Header";
import Footer from "./components/pages/Layout/Footer";
import Test from "./Test";
import { UserProvider } from "./context/UserContext";

import RequireAuth from "./components/pages/auth/RequireAuth";
import Layout from "./components/pages/Layout";
import Products from "./components/pages/Store/Products";
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Layout />,
  // },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/post",
    element: <Post />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

function App() {
  const customTheme = {
    drawer: {
      defaultProps: {
        size: 800,
        overlay: true,
        placement: "left",
        overlayProps: undefined,
        className: "",
        dismiss: undefined,
        onClose: undefined,
        transition: {
          type: "tween",
          duration: 0.3,
        },
      },
      styles: {
        base: {
          drawer: {
            position: "fixed",
            zIndex: "z-[9999]",
            pointerEvents: "pointer-events-auto",
            backgroundColor: "bg-white",
            boxSizing: "box-border",
            width: "w-full min-h-full",
            boxShadow: "shadow-2xl shadow-blue-gray-900/10",
          },
          overlay: {
            position: "fixed",
            inset: "inset-0",
            width: "w-full",
            height: "h-screen",
            pointerEvents: "pointer-events-auto",
            zIndex: "z-[9995]",
            backgroundColor: "bg-black",
            backgroundOpacity: "bg-opacity-60",
            backdropBlur: "backdrop-blur-sm",
          },
        },
      },
    },
  };

  return (
    <UserProvider>
      <ThemeProvider value={customTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
