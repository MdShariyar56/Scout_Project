import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie, FaEnvelope, FaPhone, FaVenusMars,
  FaPlus, FaSearch, FaChevronRight,
} from "react-icons/fa";

const API_URL = "https://bbpi-rover.vercel.app/scoute/teachers/";

const DESIGNATION_COLOR = {
  teacher:   "bg-blue-100 text-blue-700",
  lecturer:  "bg-indigo-100 text-indigo-700",
  professor: "bg-purple-100 text-purple-700",
  default:   "bg-gray-100 text-gray-600",
};

const getDesignationStyle = (d = "") => {
  const key = d.toLowerCase();
  return DESIGNATION_COLOR[key] ?? DESIGNATION_COLOR.default;
};

const Avatar = ({ name, image, size = "lg" }) => {
  const [imgErr, setImgErr] = useState(false);
  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  const dim = size === "lg" ? "w-24 h-24" : "w-12 h-12";
  const text = size === "lg" ? "text-2xl" : "text-base";

  return image && !imgErr ? (
    <img
      src={image}
      alt={name}
      onError={() => setImgErr(true)}
      className={`${dim} rounded-full object-cover border-4 border-white shadow-md`}
    />
  ) : (
    <div
      className={`${dim} ${text} rounded-full border-4 border-white shadow-md
        bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center
        font-black text-white`}
    >
      {initials}
    </div>
  );
};

const TeacherCard = ({ teacher, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.28 } }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-400 overflow-hidden flex flex-col"
    >
      {/* Card top banner */}
      <div className="h-20 bg-gradient-to-r from-[#1e2fa3] to-indigo-500 relative">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <Avatar name={teacher.name} image={teacher.image} size="lg" />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center pt-12 pb-6 px-5 gap-2 flex-1">
        {/* Designation badge */}
        <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${getDesignationStyle(teacher.designation)}`}>
          {teacher.designation || "—"}
        </span>

        <h3 className="text-gray-900 font-black text-xl mt-1 text-center group-hover:text-[#1e2fa3] transition-colors duration-300">
          {teacher.name}
        </h3>

        <div className="w-8 h-0.5 bg-blue-200 rounded-full mt-1" />

        {/* Info rows */}
        <div className="w-full flex flex-col gap-2 mt-3">
          {teacher.email && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaEnvelope className="text-[#1e2fa3] shrink-0 text-xs" />
              <span className="truncate">{teacher.email}</span>
            </div>
          )}
          {teacher.phone_number && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaPhone className="text-[#1e2fa3] shrink-0 text-xs" />
              <span>{teacher.phone_number}</span>
            </div>
          )}
          {teacher.gender && (
            <div className="flex items-center gap-2 text-gray-500 text-sm capitalize">
              <FaVenusMars className="text-[#1e2fa3] shrink-0 text-xs" />
              <span>{teacher.gender}</span>
            </div>
          )}
        </div>

        {/* View profile button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/teachers/${teacher.id}`)}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[#1e2fa3] hover:bg-[#162090] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-300 group/btn mt-5"
        >
          View Profile
          <FaChevronRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error("Failed to fetch"); return r.json(); })
      .then(setTeachers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = teachers.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.designation?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 240 }}
              className="inline-flex items-center justify-center w-12 h-12 bg-[#1e2fa3]/10 rounded-xl mb-4"
            >
              <FaUserTie className="text-[#1e2fa3] text-xl" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Our <span className="text-[#1e2fa3]">Faculty</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="mt-2 h-1 w-14 bg-[#1e2fa3] rounded-full"
            />
            <p className="text-gray-400 mt-3 text-sm">
              Meet the dedicated teachers of BBPI Rover Unite
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search name or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#1e2fa3] w-52 text-gray-700"
              />
            </div>

            {/* Add Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/teachers/add")}
              className="flex items-center gap-2 bg-[#1e2fa3] hover:bg-[#162090] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors duration-300 shadow-md"
            >
              <FaPlus />
              Add Teacher
            </motion.button>
          </div>
        </motion.div>

        {/* States */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-11 h-11 border-4 border-[#1e2fa3]/20 border-t-[#1e2fa3] rounded-full"
            />
            <p className="text-gray-400 text-sm">Loading faculty...</p>
          </div>
        )}

        {error && (
          <div className="text-center mt-20">
            <div className="text-5xl mb-3">⚠️</div>
            <p className="text-red-500 font-semibold">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-3 text-[#1e2fa3] underline text-sm">
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center mt-24">
            <div className="text-6xl mb-4">👤</div>
            <p className="text-gray-400 text-base">
              {search ? "No results found." : "No teachers added yet."}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filtered.map((teacher, i) => (
                <TeacherCard key={teacher.id} teacher={teacher} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeachersList;
