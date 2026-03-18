import React, { useState } from "react";
import { motion } from "motion/react"; // libraary for animation
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopicForm from "../components/TopicForm";
import SideBar from "../components/SideBar.jsx";
import FinalResult from "../components/FinalResult.jsx";

function Notes() {
  const navigate = useNavigate();
  // get user data for credit
  const { userData } = useSelector((state) => state.user);
  const credits = userData.credits; // credits data

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8 ">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" rounded-2xl mt-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)] items-start flex md:items-center justify-between gap-4 flex-col md:flex-row "
      >
        <div onClick={() => navigate("/")} className="cusror-pointer">
          {" "}
          {/* Navigate to home */}
          <h1 className="test-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent ">
            NotesHub <span className="text-gray-400">AI</span>
          </h1>
          <p className="text-sm text-gray-300 mt-1 ">
            AI-Powered exam-oriented notes & Revision
          </p>
        </div>
        {/* right side navbar block */}
        {/* + and credits remaining button */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center px-4 py-2 rounded-full gap-2 bg-white/10 border border-white/20 text-white text-sm "
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
          </button>
          {/* Notes button section */}
          <button
            onClick={() => navigate("/history")}
            className="flex items-center rounded-full px-4 py-2 gap-2 bg-white/10 border border-white/20 transition text-white"
          >
            📚 Your Notes
          </button>
        </div>
      </motion.header>
      {/* Topic form to get data about notes from user */}
      <motion.div className="mb-12">
        {/*Topic form component */}
        <TopicForm
          loading={loading}
          setResult={setResult}
          setLoading={setLoading}
          setError={setError}
        />
      </motion.div>
      {/* Answer div */}
      {/* If loading happens */}
      {loading && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-center text-black font-medium mb-6"
        >
          Generating Exam-focused notes...
        </motion.div>
      )}
      {/* If not your result use this */}
      {!result && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="h-64 rounded-2xl flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg border border-dashed border-gray-300 text-gray-500 shadow-inner "
        >
          <span className="text-4xl mb-3">📙</span>
          <p className="text-sm">Generated notes will appear here</p>
        </motion.div>
      )}

      {/* result part  */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:grid lg:grid-cols-4 gap-6"
        >
          {/* side bar */}
          <div className="lg:col-span-1">
            <SideBar result={result} />
          </div>
          {/* final result */}
          <div className="lg:col-span-3 rounded-2xl bg-white p-6 shadow[0_15px_40px_rgba(0,0,0,0.15)] ">
            <FinalResult result={result} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
export default Notes;
