import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowLeft,
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaTimes,
  FaImage,
  FaAlignLeft,
  FaHashtag,
} from "react-icons/fa";
import { MdTitle } from "react-icons/md";

const API_BASE = "https://bbpi-rover.vercel.app/scoute/events";

const formatDateFull = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch event
  useEffect(() => {
    fetch(`${API_BASE}/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setEditData(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    const year = value ? value.split("-")[0] : "";
    setEditData((prev) => ({ ...prev, date: value, year }));
  };

  // PUT — full update
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: editData.image,
          title: editData.title,
          description: editData.description,
          venue: editData.venue,
          date: editData.date,
          year: editData.year,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg =
          typeof data === "object"
            ? Object.values(data).flat().join(" ")
            : "Update failed.";
        Swal.fire("Error!", msg, "error");
        return;
      }

      setEvent(data);
      setIsEditing(false);
      Swal.fire({
        title: "Updated!",
        text: "Event updated successfully.",
        icon: "success",
        confirmButtonColor: "#1e2fa3",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Network Error!", "Could not connect to server.", "error");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = () => {
    Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      setDeleting(true);
      try {
        const res = await fetch(`${API_BASE}/${id}/`, { method: "DELETE" });
        if (res.ok || res.status === 204) {
          Swal.fire({
            title: "Deleted!",
            text: "Event has been removed.",
            icon: "success",
            confirmButtonColor: "#1e2fa3",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => navigate("/events"));
        } else {
          Swal.fire("Error!", "Could not delete event.", "error");
        }
      } catch {
        Swal.fire("Network Error!", "Could not connect to server.", "error");
      } finally {
        setDeleting(false);
      }
    });
  };

  const inputClass =
    "input input-bordered w-full bg-white border-gray-200 focus:border-[#1e2fa3] text-gray-800 rounded-lg";
  const textareaClass =
    "textarea textarea-bordered w-full bg-white border-gray-200 focus:border-[#1e2fa3] text-gray-800 rounded-lg min-h-[120px]";

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#1e2fa3]/20 border-t-[#1e2fa3] rounded-full"
          />
          <p className="text-gray-400">Loading event...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-red-500 font-semibold">{error}</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-4 text-[#1e2fa3] underline text-sm"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/events")}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1e2fa3] font-medium mb-8 transition-colors"
        >
          <FaArrowLeft />
          Back to Events
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 bg-gradient-to-br from-[#1e2fa3] to-indigo-900 overflow-hidden">
            {(isEditing ? editData.image : event.image) ? (
              <img
                src={isEditing ? editData.image : event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Date badge */}
            <div className="absolute bottom-5 left-5 bg-[#1e2fa3] text-white px-4 py-2 rounded-xl text-center shadow-lg">
              <div className="text-2xl font-black leading-none">
                {new Date(event.date).getDate()}
              </div>
              <div className="text-xs uppercase tracking-widest opacity-90">
                {new Date(event.date).toLocaleString("default", { month: "short" })}
              </div>
              <div className="text-xs opacity-80">{event.year}</div>
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              {!isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setIsEditing(true); setEditData(event); }}
                    className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#1e2fa3] font-semibold text-sm px-4 py-2 rounded-lg shadow transition"
                  >
                    <FaEdit /> Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition disabled:opacity-60"
                  >
                    <FaTrashAlt /> {deleting ? "Deleting..." : "Delete"}
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition disabled:opacity-60"
                  >
                    <FaSave /> {saving ? "Saving..." : "Save"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setIsEditing(false); setEditData(event); }}
                    className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-gray-700 font-semibold text-sm px-4 py-2 rounded-lg shadow transition"
                  >
                    <FaTimes /> Cancel
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-7 sm:p-10">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  {/* Image URL */}
                  <div>
                    <label className="text-gray-600 text-sm font-semibold flex items-center gap-1.5 mb-1.5">
                      <FaImage className="text-[#1e2fa3]" /> Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={editData.image || ""}
                      onChange={handleEditChange}
                      className={inputClass}
                      placeholder="https://..."
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-gray-600 text-sm font-semibold flex items-center gap-1.5 mb-1.5">
                      <MdTitle className="text-[#1e2fa3]" /> Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editData.title || ""}
                      onChange={handleEditChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-gray-600 text-sm font-semibold flex items-center gap-1.5 mb-1.5">
                      <FaAlignLeft className="text-[#1e2fa3]" /> Description
                    </label>
                    <textarea
                      name="description"
                      value={editData.description || ""}
                      onChange={handleEditChange}
                      className={textareaClass}
                    />
                  </div>

                  {/* Venue */}
                  <div>
                    <label className="text-gray-600 text-sm font-semibold flex items-center gap-1.5 mb-1.5">
                      <FaMapMarkerAlt className="text-[#1e2fa3]" /> Venue
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={editData.venue || ""}
                      onChange={handleEditChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Date & Year */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-600 text-sm font-semibold flex items-center gap-1.5 mb-1.5">
                        <FaCalendarAlt className="text-[#1e2fa3]" /> Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={editData.date || ""}
                        onChange={handleDateChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-gray-600 text-sm font-semibold flex items-center gap-1.5 mb-1.5">
                        <FaHashtag className="text-[#1e2fa3]" /> Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        value={editData.year || ""}
                        onChange={handleEditChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                    {event.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-[#1e2fa3] font-medium text-sm bg-blue-50 px-3 py-1.5 rounded-full">
                      <FaCalendarAlt />
                      {formatDateFull(event.date)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 font-medium text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                      <FaMapMarkerAlt className="text-[#1e2fa3]" />
                      {event.venue}
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 mb-6" />

                  <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
