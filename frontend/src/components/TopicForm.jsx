import React, { useState } from "react";
import { motion } from "motion/react"; // libraary for animation

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState("");
  const [includeDiagram, setIncludeDiagram] = useState("");
  const [includeChart, setIncludeChart] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.75)] p-8 space-y-6 "
    >
      {/* Input for topic */}
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-white/30 "
        placeholder="Enter Topic  (e.g. web development)"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      />
      {/* Input for  classlevel*/}
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-white/30 "
        placeholder="Class / Level  (e.g. Class 10 , 12)"
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
      />
      {/* Input for  examtype*/}
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-white/30 "
        placeholder="Exam Type  (e.g. CBSE , JEE , NEET)"
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
      />
      {/* toggle buttons */}
      <div className="flex flex-col md:flex-row gap-6">
        <Toggle
          label="Exam Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />
        <Toggle
          label="Includes Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label="Include Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
      </div>
      {/* Generation Button */}
      <motion.button
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        disabled={loading}
        className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition ${loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gradient-to-br from-white to-gray-200 text-black "} `}
      >
        {loading ? "Generating Notes..." : "Generate Notes"}
      </motion.button>
    </motion.div>
  );
}

// function shift later
function Toggle({ label, checked, onChange }) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer select-none "
      onClick={onChange}
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(34,197,94,0.35)" // greeen when ON
            : "rgba(255,255,255,0.15)", // gray when off
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border-white/20 backdrop-blur-lg "
      >
        {/* small circle for toggle bar */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_15px_15px_rgba(0,0,0,0.5)] "
          style={{ left: checked ? "1.6rem" : "0.25rem" }}
        ></motion.div>
      </motion.div>
      {/* label */}
      <span
        className={`text-sm transition-colors ${checked ? "text-green-300" : "text-gray-300"} `}
      >
        {label}
      </span>
    </div>
  );
}
export default TopicForm;
