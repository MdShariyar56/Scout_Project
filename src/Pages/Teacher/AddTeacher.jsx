import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaUser, FaEnvelope, FaLock, FaPhone,
  FaUserTie, FaArrowLeft, FaCamera,
} from "react-icons/fa";
import { FaVenusMars } from "react-icons/fa";

const API_URL = "https://bbpi-rover.vercel.app/scoute/teachers/";

const DESIGNATIONS = ["teacher", "lecturer", "professor", "assistant_professor", "HOD"];
const GENDERS      = ["male", "female", "other"];

const Field = ({ label, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="form-control"
  >
    <label className="label py-1">
      <span className="label-text text-gray-600 font-semibold text-sm">{label}</span>
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center bg-[#1e2fa3] rounded-l-xl h-full w-11 justify-center z-10">
        <Icon className="text-white text-sm" />
      </span>
      {children}
    </div>
  </motion.div>
);

const inputCls =
  "input input-bordered w-full pl-14 bg-white border-gray-200 focus:border-[#1e2fa3] text-gray-800 rounded-xl text-sm";
const selectCls =
  "select select-bordered w-full pl-14 bg-white border-gray-200 focus:border-[#1e2fa3] text-gray-800 rounded-xl text-sm";

const AddTeacher = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewErr, setPreviewErr] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", password: "",
    phone_number: "", gender: "",
    designation: "", image: "",
  });

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (name === "image") setPreviewErr(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["name", "email", "password", "designation"];
    for (const k of required) {
      if (!form[k]) {
        Swal.fire("Oops!", `Please fill: ${k.replace("_", " ")}`, "error");
        return;
      }
    }

    setLoading(true);
    try {
      const res  = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg = typeof data === "object"
          ? Object.values(data).flat().join(" ")
          : "Failed to add teacher.";
        Swal.fire("Error!", msg, "error");
        return;
      }

      Swal.fire({
        title: "Teacher Added!",
        text: `${data.name} has been registered successfully.`,
        icon: "success",
        confirmButtonColor: "#1e2fa3",
      }).then(() => navigate("/teachers"));
    } catch {
      Swal.fire("Network Error!", "Could not connect to server.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-xl mx-auto">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/teachers")}
          className="flex items-center gap-2 text-gray-400 hover:text-[#1e2fa3] text-sm font-medium mb-8 transition-colors"
        >
          <FaArrowLeft /> Back to Faculty
        </motion.button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Top banner */}
          <div className="h-24 bg-gradient-to-r from-[#1e2fa3] to-indigo-500 relative flex items-end px-8 pb-0">
            <div className="absolute -bottom-10 left-8">
              {/* Avatar preview */}
              {form.image && !previewErr ? (
                <img
                  src={form.image}
                  alt="preview"
                  onError={() => setPreviewErr(true)}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <FaCamera className="text-white text-xl" />
                </div>
              )}
            </div>
          </div>

          {/* Form body */}
          <div className="px-8 pt-14 pb-8">
            <h1 className="text-2xl font-black text-gray-900">Add New Teacher</h1>
            <div className="mt-1.5 h-1 w-10 bg-[#1e2fa3] rounded-full mb-6" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <Field label="Full Name *" icon={FaUser} delay={0.05}>
                <input type="text" name="name" value={form.name}
                  onChange={handle} placeholder="Full Name" className={inputCls} />
              </Field>

              <Field label="Email *" icon={FaEnvelope} delay={0.1}>
                <input type="email" name="email" value={form.email}
                  onChange={handle} placeholder="Email address" className={inputCls} />
              </Field>

              <Field label="Password *" icon={FaLock} delay={0.15}>
                <input type="password" name="password" value={form.password}
                  onChange={handle} placeholder="Password" className={inputCls} />
              </Field>

              <Field label="Phone Number" icon={FaPhone} delay={0.2}>
                <input type="text" name="phone_number" value={form.phone_number}
                  onChange={handle} placeholder="Phone Number" className={inputCls} />
              </Field>

              <Field label="Image URL" icon={FaCamera} delay={0.25}>
                <input type="text" name="image" value={form.image}
                  onChange={handle} placeholder="https://..." className={inputCls} />
              </Field>

              <Field label="Designation *" icon={FaUserTie} delay={0.3}>
                <select name="designation" value={form.designation}
                  onChange={handle} className={selectCls}>
                  <option value="" disabled>Select Designation</option>
                  {DESIGNATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Gender buttons */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="form-control"
              >
                <label className="label py-1">
                  <span className="label-text text-gray-600 font-semibold text-sm">Gender</span>
                </label>
                <div className="flex gap-2">
                  {GENDERS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, gender: g }))}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-250 ${
                        form.gender === g
                          ? "bg-[#1e2fa3] text-white shadow"
                          : "bg-gray-100 text-gray-500 hover:bg-blue-50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-[#1e2fa3] hover:bg-[#162090] text-white font-bold py-3.5 rounded-xl text-sm transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    Adding Teacher...
                  </span>
                ) : "Add Teacher"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AddTeacher;
