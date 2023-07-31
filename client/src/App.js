import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Error_page from "./components/pages/Errors/Error_page";
import { ThemeProvider } from "@material-tailwind/react";
import Post from "./components/pages/Login/Post"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error_page />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/post",
    element: <Post />,
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
    <ThemeProvider value={customTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
