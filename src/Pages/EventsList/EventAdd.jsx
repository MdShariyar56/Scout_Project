import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaImage,
  FaAlignLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHashtag,
  FaArrowLeft,
} from "react-icons/fa";
import { MdTitle } from "react-icons/md";

const API_URL = "https://bbpi-rover.vercel.app/scoute/events/";

const InputField = ({ label, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="form-control"
  >
    <label className="label py-1">
      <span className="label-text text-gray-700 font-semibold">{label}</span>
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center bg-[#1e2fa3] rounded-l-lg h-full w-11 justify-center z-10">
        <Icon className="text-white text-sm" />
      </span>
      {children}
    </div>
  </motion.div>
);

const AddEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    venue: "",
    date: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-fill year when date changes
  const handleDateChange = (e) => {
    const value = e.target.value;
    const year = value ? value.split("-")[0] : "";
    setFormData((prev) => ({ ...prev, date: value, year }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key]) {
        Swal.fire("Oops!", "Please fill all the fields", "error");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          typeof data === "object"
            ? Object.values(data).flat().join(" ")
            : "Failed to add event.";
        Swal.fire("Error!", msg, "error");
        return;
      }

      Swal.fire({
        title: "Event Added!",
        text: "Your event has been created successfully.",
        icon: "success",
        confirmButtonColor: "#1e2fa3",
      }).then(() => navigate("/events"));
    } catch {
      Swal.fire("Network Error!", "Could not connect to server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "input input-bordered w-full pl-14 bg-white border-gray-200 focus:border-[#1e2fa3] text-gray-800 rounded-lg";
  const textareaClass =
    "textarea textarea-bordered w-full pl-14 pt-3 bg-white border-gray-200 focus:border-[#1e2fa3] text-gray-800 rounded-lg min-h-[120px]";

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/events")}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1e2fa3] font-medium mb-8 transition-colors"
        >
          <FaArrowLeft />
          Back to Events
        </motion.button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900">Add New Event</h1>
            <div className="mt-2 h-1 w-12 bg-[#1e2fa3] rounded-full" />
            <p className="text-gray-400 mt-2 text-sm">
              Fill in the details to create a new event
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Title */}
            <InputField label="Event Title *" icon={MdTitle}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event Title"
                className={inputClass}
              />
            </InputField>

            {/* Image URL */}
            <InputField label="Image URL *" icon={FaImage}>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={inputClass}
              />
            </InputField>

            {/* Image Preview */}
            {formData.image && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="rounded-xl overflow-hidden border border-gray-100"
              >
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </motion.div>
            )}

            {/* Description */}
            <InputField label="Description *" icon={FaAlignLeft}>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write event description..."
                className={textareaClass}
              />
            </InputField>

            {/* Venue */}
            <InputField label="Venue *" icon={FaMapMarkerAlt}>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Event Venue / Location"
                className={inputClass}
              />
            </InputField>

            {/* Date & Year — side by side */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Date *" icon={FaCalendarAlt}>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleDateChange}
                  className={inputClass}
                />
              </InputField>

              <InputField label="Year *" icon={FaHashtag}>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2024"
                  className={inputClass}
                />
              </InputField>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-[#1e2fa3] hover:bg-[#162090] text-white font-bold py-3.5 rounded-xl text-base transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Creating Event...
                </span>
              ) : (
                "Create Event"
              )}
            </motion.button>

          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AddEvent;
