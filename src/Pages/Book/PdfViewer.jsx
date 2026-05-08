import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import BgLottie from "../../assets/Pdfloader.json";
import { FaBookOpen, FaTimes, FaArrowRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

const ScoutBookLibrary = () => {
  const navigate = useNavigate();
  const [activePdf, setActivePdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReadMore = (url) => {
    setActivePdf(url);
    setIsLoading(true);
  };

  const handleClose = () => {
    setActivePdf(null);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (activePdf) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activePdf]);

  return (
    <>
      {/* Custom Swiper dot styles */}
      <style>{`
        .book-swiper .swiper-pagination-bullet {
          background: #3b5bdb;
          opacity: 0.4;
          width: 8px;
          height: 8px;
          transition: all 0.3s;
        }
        .book-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
        .book-swiper .swiper-pagination {
          margin-top: 20px;
          position: relative;
          bottom: unset;
        }
      `}</style>

      <section className="bg-[#0a0f1e] text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Icon badge */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
              className="inline-flex items-center justify-center w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl mb-5"
            >
              <FaBookOpen className="text-blue-400 text-xl" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Scout{" "}
              <span className="text-blue-500">Books</span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3 h-1 w-16 bg-blue-600 rounded-full mx-auto"
            />

            <p className="max-w-xl mx-auto text-gray-400 mt-4 text-sm leading-relaxed">
              Access all Bangladesh Scouts resources and handbooks in one place.
              Select a book to start reading instantly.
            </p>
          </motion.div>

          {/* ── Swiper ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              className="book-swiper pb-10"
            >
              {books.map((book) => (
                <SwiperSlide key={book.id} className="px-1 py-2">
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative bg-[#10172a] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 hover:shadow-2xl transition-shadow duration-500 flex flex-col h-full"
                  >
                    {/* Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {book.tag}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative h-56 bg-[#0d1426] overflow-hidden">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Bottom fade */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10172a] via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 gap-4">
                      <h2 className="text-white font-bold text-base leading-snug group-hover:text-blue-400 transition-colors duration-300">
                        {book.title}
                      </h2>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReadMore(book.pdfUrl)}
                        className="mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-300 group/btn"
                      >
                        <FaBookOpen className="transition-transform duration-300 group-hover/btn:rotate-12" />
                        Read More
                      </motion.button>
                    </div>

                    {/* Glow border */}
                    <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/40 transition-all duration-500 pointer-events-none" />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* ── See More Button ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/all-books")}
              className="flex items-center gap-2 border border-blue-500/50 hover:border-blue-400 hover:bg-blue-600/10 text-blue-400 font-semibold px-7 py-3 rounded-full text-sm transition-all duration-300 group"
            >
              See All Books
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

        </div>
      </section>

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
              {/* Modal top bar */}
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

              {/* Loading */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 top-12 flex flex-col items-center justify-center bg-[#0a0f1e] z-10"
                  >
                    <Lottie animationData={BgLottie} loop className="w-40 h-40" />
                    <p className="text-gray-400 text-sm mt-3 animate-pulse">
                      Loading PDF...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

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
    </>
  );
};

export default ScoutBookLibrary;