import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./services/api.js";
import { useDispatch, useSelector } from "react-redux";
import History from "./pages/History.jsx";
import Notes from "./pages/Notes.jsx";
import Pricing from "./pages/Pricing.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";

// export const serverUrl = "http://localhost:8000";
export const serverUrl = "https://noteshub-gz7l.onrender.com";

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
        {/* Home route */}
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        {/* <Route path="/" element={<Home />} /> */}
        {/* Auth route */}
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
        {/* history */}
        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/auth" replace />}
        />
        {/* notes */}
        <Route
          path="/notes"
          element={userData ? <Notes /> : <Navigate to="/auth" replace />}
        />
        {/* pricing */}
        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
        />
        {/* payment success */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
        {/* Payment failed */}
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
}

export default App;
