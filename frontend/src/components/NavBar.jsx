import React from "react";
import { AnimatePresence, motion } from "motion/react"; // libraary for animation
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function NavBar() {
  // get user data for credit
  const { userData } = useSelector((state) => state.user);
  const credits = userData.credits;
  // use state for credits popup
  const [showCredits, setShowCredits] = useState(false); // state to manage credits section
  const [showProfile, setShowProfile] = useState(false); // state to manage profile block

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function to handle signout
  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null)); // set user data to null
      navigate("/auth"); // navigate to auth
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0 }}
      className="relative z-20 mx-6 mt-6 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_22px_55px_rgba(0,0,0,0.75)] flex items-center justify-between px-8 py-4 "
    >
      {/* left div */}
      <div className="flex items-center gap-3 ">
        <img src={logo} alt="noteshub" className="w-9 h-9" />
        <span className="text-lg hidden md:block font-semibold text-white ">
          NotesHub <span className="text-gray-400">AI</span>
        </span>
      </div>
      {/* right div */}
      <div className="flex items-center gap-6 relative">
        <div className="relative  ">
          <motion.div
            onClick={() => {
              setShowCredits(!showCredits);
              setShowProfile(false); // to swith another
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white text-sm shadow-md cursor-pointer "
          >
            <span className="text-xl">💎</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold "
            >
              ➕
            </motion.span>
          </motion.div>
          {/* box that appears on clicking credit button */}
          {/* If showcredits true then show otherwise not */}
          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[-10px] mt-4 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-wgite "
              >
                <h4 className="font-semibold text-gray-300 mb-2 ">
                  Buy Credits
                </h4>
                <p className="text-sm text-gray-300 mb-4">
                  Use credits to generate AI notes, diagrams & PDFs.
                </p>
                <button
                  onClick={() => {
                    setShowCredits(false);
                    navigate("/pricing"); // nvigate to pricing
                  }}
                  className="w-full py-2 rounded-lg bg-gradient-to-br from-white to-gray-200 text-black font-semibold hover:opacity-90 cursor-pointer"
                >
                  Buy more Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* profile icon */}
        <div className="relative  ">
          <motion.div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCredits(false); // to swith another
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white text-sm shadow-md cursor-pointer "
          >
            <span className="text-md">
              {userData?.name.slice(0, 1).toUpperCase()}
            </span>
          </motion.div>
          {/* profile tap block */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-wgite "
              >
                <MenuItem
                  text="History"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/history");
                  }}
                />
                <MenuItem text="Sign out" red onClick={handleSignOut} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// component shift it later
// component for profile block
function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`w-full text-left px-5 py-3 text-sm transition-colors rounded-xl ${red ? "text-red-400 hover:bg-red-500/10" : "text-gray-200 hover:bg-white/10"}`}
    >
      {text}
    </div>
  );
}

export default NavBar;
