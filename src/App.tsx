import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useAppDispatch } from "./hooks/redux-hooks";
import { useAuth } from "./hooks/useAuth";
import DrawPage from "./pages/DrawPage";
import Feed from "./pages/Feed";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login/Login";
import Sign from "./pages/Sign/Sign";
import { setUser } from "./store/slices/userSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const isUser = localStorage.getItem('userInfo');
    if(isUser) {
      dispatch(setUser({...JSON.parse(isUser)}))
    }
  }, [])
  
  const { isAuth } = useAuth();
  
  return isAuth ? (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Feed />} />
          <Route path="draw" element={<DrawPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  ) : (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
