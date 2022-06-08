import React, { useEffect } from "react"
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice"
import AddEditBlog from "./pages/AddEditBlog";
import SingleBlog from "./pages/SingleBlog";
import MyBlogs from "./pages/MyBlogs";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagBlogs from "./pages/TagBlogs";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))

  useEffect(() => {
    dispatch(setUser(user))
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/search" element={<Home />} />
          <Route path="/blogs/tag/:tag" element={<TagBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addBlog" element={ <PrivateRoute><AddEditBlog /></PrivateRoute>  } />
          <Route path="/editBlog/:id" element={<PrivateRoute><AddEditBlog /></PrivateRoute>} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/dashboard" element={<MyBlogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
