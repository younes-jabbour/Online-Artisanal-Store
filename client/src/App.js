import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/pages/auth/register/Register";
import Login from "./components/pages/auth/Login/Login";
import Home from "./components/pages/Home/Home";
import Post from "./components/pages/auth/Login/Post";
import Profile from "./components/pages/Profile/Profile";
import Test from "./Test";
import { UserProvider } from "./context/UserContext";

import RequireAuth from "./components/pages/auth/RequireAuth";
import Layout from "./components/pages/Layout";
import Products from "./components/pages/Store/Products";
import { ThemeProvider } from "@material-tailwind/react";
import Missing from "./components/pages/Errors/Missing";
import ListProducts from "./components/pages/Profile/artisan/ListProducts";
import Anauthorized from "./components/pages/Errors/Anauthorized";
import LearnPage from "./components/learning/LearnPage";
import Dashboard from "./components/learning/artisan/Dashboard";
import SinglePageCourse from "./components/learning/artisan/SinglePageCourse";
import Success from "./components/payment/Success";
import Concel from "./components/payment/Concel";
import CoursePage from "./components/learning/CoursePage";
import MyCourses from "./components/learning/MyCourses";
import SingleProductPage from "./components/pages/Store/SingleProductPage";
import ListCoursesPage from "./components/learning/ListCoursesPage";
import RequireAuthArtisan from "./components/pages/auth/RequireAuthArtisan";

function App() {
  const customTheme = {
    drawer: {
      defaultProps: {
        size: 1200,
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
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              {/* private routes require authentication */}
              {/* authentification required for users */}
              <Route element={<RequireAuth />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/my_courses" element={<MyCourses />} />
              </Route>
              {/* authentification required for artisans */}
              <Route element={<RequireAuthArtisan />}>
                <Route
                  path="/profile/list_of_products"
                  element={<ListProducts />}
                />
                <Route path="/profile/course" element={<Dashboard />} />
              </Route>

              {/* public routes */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<SingleProductPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/learn/List_Courses" element={<ListCoursesPage />} />
              <Route path="/learn/course" element={<CoursePage />} />
            </Route>
            {/* without layout */}
            <Route element={<RequireAuthArtisan />}>
              <Route path="/profile/course" element={<Dashboard />} />
              <Route
                path="/profile/course/lessons"
                element={<SinglePageCourse />}
              />
            </Route>
            {/* // des routes pour les Tests */}
            <Route path="/post" element={<Post />} />
            <Route path="/test" element={<Test />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/anauthorized" element={<Anauthorized />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Concel />} />
            {/* <Route path="/Courses" element={<Courses />} /> */}
            <Route path="*" element={<Missing />} />
          </Routes>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
