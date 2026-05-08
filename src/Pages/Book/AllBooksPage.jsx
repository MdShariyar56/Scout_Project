import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import BgLottie from "../../assets/Pdfloader.json";
import { FaBookOpen, FaTimes, FaBook } from "react-icons/fa";

const books = [
  {
    id: 1,
    title: "Structure and Rules",
    image: "https://i.ibb.co/Xf4hD9b1/Untitled-design-5.png",
    pdfUrl: "/Pdf/Gothon_Neowm.pdf",
    tag: "Regulation",
  },
  {
    id: 2,
    title: "Scout Songs",
    image: "https://i.ibb.co/WWZFHN1C/Untitled-design-6.png",
    pdfUrl: "/Pdf/ScoutSong.pdf",
    tag: "Culture",
  },
  {
    id: 3,
    title: "Code and Cipher",
    image: "https://i.ibb.co/67zGC0qZ/Untitled-design-8.png",
    pdfUrl: "/Pdf/CodeChiper.pdf",
    tag: "Skills",
  },
  {
    id: 4,
    title: "Pioneering",
    image: "https://i.ibb.co/Kx9LXS17/Screenshot-2026-02-17-125410-Picsart-Ai-Image-Enhancer.png",
    pdfUrl: "/Pdf/Pioneering.pdf",
    tag: "Training",
  },
  {
    id: 5,
    title: "Scout Sports",
    image: "https://i.ibb.co/Y741Q9rg/Screenshot-2026-02-17-142119-Picsart-Ai-Image-Enhancer.png",
    pdfUrl: "/Pdf/Paying.pdf",
    tag: "Activity",
  },
  {
    id: 6,
    title: "Scout Shop Price List",
    image: "https://i.ibb.co/27Xnmm1r/Untitled-design-9-01.jpg",
    pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    tag: "Reference",
  },
];

// Card shimmer animation variant
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const BookCard = ({ book, index, onRead }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="group relative bg-[#10172a] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 hover:shadow-2xl transition-shadow duration-500 flex flex-col"
  >
    {/* Tag */}
    <div className="absolute top-3 left-3 z-10">
      <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
        {book.tag}
      </span>
    </div>

    {/* Image */}
    <div className="relative h-56 overflow-hidden bg-[#0d1426]">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-4"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#10172a] via-transparent to-transparent" />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-5 gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-600/15 rounded-lg mt-0.5 shrink-0">
          <FaBook className="text-blue-400 text-sm" />
        </div>
        <h2 className="text-white font-bold text-lg leading-snug group-hover:text-blue-400 transition-colors duration-300">
          {book.title}
        </h2>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onRead(book.pdfUrl)}
        className="mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-300 group/btn"
      >
        <FaBookOpen className="transition-transform duration-300 group-hover/btn:rotate-12" />
        Read Book
      </motion.button>
    </div>

    {/* Glow border on hover */}
    <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/40 transition-all duration-500 pointer-events-none" />
  </motion.div>
);

const AllBooksPage = () => {
  const [activePdf, setActivePdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRead = (url) => {
    setActivePdf(url);
    setIsLoading(true);
  };

  const handleClose = () => {
    setActivePdf(null);
    setIsLoading(false);
  };

  // ESC to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (activePdf) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activePdf]);

  return (
    <div
      className="min-h-screen text-white py-16 px-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#060d1f]/85 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl mb-5"
          >
            <FaBookOpen className="text-blue-400 text-2xl" />
          </motion.div>

          <h1 className="text-5xl font-black tracking-tight text-white">
            Scout{" "}
            <span className="text-blue-500">Library</span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 h-1 w-20 bg-blue-600 rounded-full mx-auto"
          />

          <p className="text-gray-400 mt-4 text-base max-w-md mx-auto leading-relaxed">
            All essential Scout books and references in one place. Click to read instantly.
          </p>
        </motion.div>

        {/* ── Books Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {books.map((book, i) => (
            <BookCard
              key={book.id}
              book={book}
              index={i}
              onRead={handleRead}
            />
          ))}
        </div>
      </div>

      {/* ── PDF Modal ── */}
      <AnimatePresence>
        {activePdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl h-[88vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-[#1e2fa3] flex items-center justify-between px-4 z-20">
                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                  <FaBookOpen />
                  Scout Book Viewer
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Loading overlay */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 top-12 flex flex-col items-center justify-center bg-[#0a0f1e] z-10"
                  >
                    <Lottie
                      animationData={BgLottie}
                      loop
                      className="w-40 h-40"
                    />
                    <p className="text-gray-400 text-sm mt-3 animate-pulse">
                      Loading PDF...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PDF iframe */}
              <iframe
                src={`https://docs.google.com/gview?url=${window.location.origin}${activePdf}&embedded=true`}
                title="PDF Viewer"
                onLoad={() => setIsLoading(false)}
                className="w-full h-full pt-12"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllBooksPage;
