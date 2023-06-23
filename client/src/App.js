import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ForgotPass from "./pages/ForgotPass/ForgotPass";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector((state) => state.auth)
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to={'/login'} /> } />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={'/'} />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={'/'} />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to={'/login'} />} />
        <Route path="/forgot" element={!user ? <ForgotPass /> : <Navigate to={'/'} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
