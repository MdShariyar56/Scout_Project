import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight, FaPlus } from "react-icons/fa";

const API_URL = "https://bbpi-rover.vercel.app/scoute/events/";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleString("default", { month: "short" }),
    year: d.getFullYear(),
  };
};

const EventCard = ({ event, index }) => {
  const navigate = useNavigate();
  const { day, month, year } = formatDate(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-900 items-center justify-center hidden"
          style={{ display: event.image ? "none" : "flex" }}
        >
          <span className="text-white/30 text-6xl font-black">
            {event.title?.[0] ?? "E"}
          </span>
        </div>

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3 bg-[#1e2fa3] text-white text-center px-3 py-2 rounded-lg shadow-lg min-w-[52px]">
          <div className="text-xl font-black leading-none">{day}</div>
          <div className="text-[11px] font-semibold uppercase tracking-wide opacity-90">{month}</div>
          <div className="text-[11px] font-semibold opacity-80">{year}</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        <h3 className="text-gray-900 font-bold text-lg leading-snug group-hover:text-[#1e2fa3] transition-colors duration-300 line-clamp-2">
          {event.title}
        </h3>

        {event.venue && (
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <FaMapMarkerAlt className="text-[#1e2fa3] shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        )}

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {event.description}
        </p>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate(`/events/${event.id}`)}
          className="mt-3 flex items-center gap-2 bg-[#1e2fa3] hover:bg-[#162090] text-white text-sm font-semibold px-5 py-2.5 rounded-lg self-start transition-colors duration-300 group/btn"
        >
          Read More
          <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Events
            </h1>
            <div className="mt-2 h-1 w-16 bg-[#1e2fa3] rounded-full" />
            <p className="text-gray-500 mt-3 text-base">
              Explore all upcoming and past events of BBPI Rover Unite
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/events/add")}
            className="flex items-center gap-2 bg-[#1e2fa3] hover:bg-[#162090] text-white font-semibold px-5 py-3 rounded-xl shadow-md transition-colors duration-300"
          >
            <FaPlus />
            Add Event
          </motion.button>
        </div>
      </motion.div>

      {/* States */}
      {loading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#1e2fa3]/20 border-t-[#1e2fa3] rounded-full"
            />
            <p className="text-gray-500 font-medium">Loading events...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto text-center mt-20">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-red-500 font-semibold text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-[#1e2fa3] underline text-sm"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="text-center mt-20">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-400 text-lg">No events found yet.</p>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && !error && events.length > 0 && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence>
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default EventsList;
