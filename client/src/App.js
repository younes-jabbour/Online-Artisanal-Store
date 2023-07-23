import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home"
import Error_page from "./components/pages/Errors/Error_page"

const router =  createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: < Error_page/>,
  },

  {
    path : "/register",
    element : <Register/>,
  },
  {
    path : "/login",
    element: <Login/>,
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
