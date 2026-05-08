import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaArrowLeft, FaEdit, FaTrashAlt,
  FaSave, FaTimes, FaEnvelope,
  FaPhone, FaVenusMars, FaUserTie, FaCamera,
} from "react-icons/fa";

const API_BASE   = "https://bbpi-rover.vercel.app/scoute/teachers";
const DESIGNATIONS = ["teacher", "lecturer", "professor", "assistant_professor", "HOD"];
const GENDERS      = ["male", "female", "other"];

const DESIGNATION_COLOR = {
  teacher:              "bg-blue-100 text-blue-700",
  lecturer:             "bg-indigo-100 text-indigo-700",
  professor:            "bg-purple-100 text-purple-700",
  assistant_professor:  "bg-violet-100 text-violet-700",
  hod:                  "bg-pink-100 text-pink-700",
  default:              "bg-gray-100 text-gray-600",
};
const getDStyle = (d = "") =>
  DESIGNATION_COLOR[d.toLowerCase()] ?? DESIGNATION_COLOR.default;

const Avatar = ({ name, image, size = "xl" }) => {
  const [err, setErr] = useState(false);
  const initials = name?.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
  const dim  = size === "xl" ? "w-32 h-32" : "w-20 h-20";
  const text = size === "xl" ? "text-3xl" : "text-xl";

  return image && !err ? (
    <img src={image} alt={name} onError={() => setErr(true)}
      className={`${dim} rounded-full object-cover border-4 border-white shadow-xl`} />
  ) : (
    <div className={`${dim} ${text} rounded-full border-4 border-white shadow-xl
      bg-gradient-to-br from-[#1e2fa3] to-indigo-500 flex items-center justify-center font-black text-white`}>
      {initials}
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) =>
  value ? (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-[#1e2fa3]/08 flex items-center justify-center shrink-0 bg-blue-50">
        <Icon className="text-[#1e2fa3] text-sm" />
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium">{label}</p>
        <p className="text-gray-800 text-sm font-semibold capitalize">{value}</p>
      </div>
    </div>
  ) : null;

const inputCls =
  "input input-bordered w-full bg-white border-gray-200 focus:border-[#1e2fa3] text-gray-800 rounded-xl text-sm";
const selectCls =
  "select select-bordered w-full bg-white border-gray-200 focus:border-[#1e2fa3] text-gray-800 rounded-xl text-sm";

const TeacherDetails = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [teacher,  setTeacher]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [isEdit,   setIsEdit]   = useState(false);
  const [editData, setEditData] = useState({});
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/${id}/`)
      .then((r) => { if (!r.ok) throw new Error("Teacher not found"); return r.json(); })
      .then((d)  => { setTeacher(d); setEditData(d); })
      .catch((e) => setError(e.message))
      .finally(()  => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((p) => ({ ...p, [name]: value }));
  };

  // PUT — full update
  const handleSave = async () => {
    setSaving(true);
    try {
      const res  = await fetch(`${API_BASE}/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editData.name, email: editData.email,
          password: editData.password || "12345",
          phone_number: editData.phone_number,
          gender: editData.gender, designation: editData.designation,
          image: editData.image,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        Swal.fire("Error!", Object.values(data).flat().join(" "), "error");
        return;
      }
      setTeacher(data);
      setIsEdit(false);
      Swal.fire({ title: "Updated!", icon: "success",
        confirmButtonColor: "#1e2fa3", timer: 1600, showConfirmButton: false });
    } catch {
      Swal.fire("Network Error!", "Could not connect to server.", "error");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = () => {
    Swal.fire({
      title: "Delete Teacher?", text: "This cannot be undone.",
      icon: "warning", showCancelButton: true,
      confirmButtonColor: "#dc2626", cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!",
    }).then(async (r) => {
      if (!r.isConfirmed) return;
      setDeleting(true);
      try {
        const res = await fetch(`${API_BASE}/${id}/`, { method: "DELETE" });
        if (res.ok || res.status === 204) {
          Swal.fire({ title: "Deleted!", icon: "success",
            confirmButtonColor: "#1e2fa3", timer: 1400, showConfirmButton: false,
          }).then(() => navigate("/teachers"));
        } else {
          Swal.fire("Error!", "Could not delete.", "error");
        }
      } catch {
        Swal.fire("Network Error!", "Could not connect.", "error");
      } finally {
        setDeleting(false);
      }
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-11 h-11 border-4 border-[#1e2fa3]/20 border-t-[#1e2fa3] rounded-full" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center">
      <div>
        <div className="text-5xl mb-3">😕</div>
        <p className="text-red-500 font-semibold">{error}</p>
        <button onClick={() => navigate("/teachers")}
          className="mt-3 text-[#1e2fa3] underline text-sm">Back to Faculty</button>
      </div>
    </div>
  );

  const current = isEdit ? editData : teacher;

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <motion.button initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/teachers")}
          className="flex items-center gap-2 text-gray-400 hover:text-[#1e2fa3] text-sm font-medium mb-8 transition-colors">
          <FaArrowLeft /> Back to Faculty
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Banner */}
          <div className="h-36 bg-gradient-to-r from-[#1e2fa3] to-indigo-500 relative">
            <div className="absolute -bottom-14 left-8">
              <Avatar name={current.name} image={current.image} size="xl" />
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              {!isEdit ? (
                <>
                  <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
                    onClick={() => { setIsEdit(true); setEditData(teacher); }}
                    className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#1e2fa3] font-semibold text-xs px-4 py-2 rounded-lg shadow transition">
                    <FaEdit /> Edit
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
                    onClick={handleDelete} disabled={deleting}
                    className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow transition disabled:opacity-60">
                    <FaTrashAlt /> {deleting ? "..." : "Delete"}
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
                    onClick={handleSave} disabled={saving}
                    className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow transition disabled:opacity-60">
                    <FaSave /> {saving ? "Saving..." : "Save"}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
                    onClick={() => { setIsEdit(false); setEditData(teacher); }}
                    className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-gray-600 font-semibold text-xs px-4 py-2 rounded-lg shadow transition">
                    <FaTimes /> Cancel
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="px-8 pt-20 pb-8">
            <AnimatePresence mode="wait">
              {!isEdit ? (
                /* ── VIEW MODE ── */
                <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h1 className="text-3xl font-black text-gray-900">{teacher.name}</h1>
                      <span className={`mt-2 inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${getDStyle(teacher.designation)}`}>
                        {teacher.designation || "—"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 h-px bg-gray-100" />

                  <div className="mt-4 flex flex-col">
                    <InfoRow icon={FaEnvelope}  label="Email"       value={teacher.email} />
                    <InfoRow icon={FaPhone}     label="Phone"       value={teacher.phone_number} />
                    <InfoRow icon={FaVenusMars} label="Gender"      value={teacher.gender} />
                    <InfoRow icon={FaUserTie}   label="Designation" value={teacher.designation} />
                  </div>

                  {teacher.created_at && (
                    <p className="text-gray-300 text-xs mt-6">
                      Added: {new Date(teacher.created_at).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </p>
                  )}
                </motion.div>
              ) : (
                /* ── EDIT MODE ── */
                <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-4">

                  <h2 className="text-xl font-black text-gray-900 mb-1">Edit Profile</h2>

                  {/* Name */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Full Name</label>
                    <input type="text" name="name" value={editData.name || ""}
                      onChange={handleChange} className={inputCls} />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Email</label>
                    <input type="email" name="email" value={editData.email || ""}
                      onChange={handleChange} className={inputCls} />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block flex items-center gap-1">
                      <FaCamera className="text-[#1e2fa3]" /> Image URL
                    </label>
                    <input type="text" name="image" value={editData.image || ""}
                      onChange={handleChange} placeholder="https://..." className={inputCls} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Phone Number</label>
                    <input type="text" name="phone_number" value={editData.phone_number || ""}
                      onChange={handleChange} className={inputCls} />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Designation</label>
                    <select name="designation" value={editData.designation || ""}
                      onChange={handleChange} className={selectCls}>
                      <option value="" disabled>Select Designation</option>
                      {DESIGNATIONS.map((d) => (
                        <option key={d} value={d}>
                          {d.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-2 block">Gender</label>
                    <div className="flex gap-2">
                      {GENDERS.map((g) => (
                        <button key={g} type="button"
                          onClick={() => setEditData((p) => ({ ...p, gender: g }))}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-250 ${
                            editData.gender === g
                              ? "bg-[#1e2fa3] text-white shadow"
                              : "bg-gray-100 text-gray-500 hover:bg-blue-50"
                          }`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeacherDetails;
