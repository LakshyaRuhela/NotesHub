import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./services/api.js";
import { useDispatch, useSelector } from "react-redux";
import History from "./pages/History.jsx";
import Notes from "./pages/Notes.jsx";
import Pricing from "./pages/Pricing.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const dispatch = useDispatch();
  // get current user
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);
  // console.log(userData);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/notes"
          element={userData ? <Notes /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
