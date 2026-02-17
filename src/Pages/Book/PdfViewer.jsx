import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import BgLottie from "../../assets/Pdfloader.json";

// Swiper v10+ style imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ScoutBookLibrary = () => {
  const navigate = useNavigate();
  const [activePdf, setActivePdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const books = [
    {
      id: 1,
      title: "Structure and Rules",
      image: "https://i.ibb.co/Xf4hD9b1/Untitled-design-5.png",
      pdfUrl: "/Pdf/Gothon_Neowm.pdf",
    },
    {
      id: 2,
      title: "Scout Songs",
      image: "https://i.ibb.co/WWZFHN1C/Untitled-design-6.png",
      pdfUrl: "/Pdf/ScoutSong.pdf",
    },
    {
      id: 3,
      title: "Code and Cipher",
      image: "https://i.ibb.co/67zGC0qZ/Untitled-design-8.png",
      pdfUrl: "/Pdf/CodeChiper.pdf",
    },
    {
      id: 4,
      title: "Pioneering",
      image: "https://i.ibb.co/Kx9LXS17/Screenshot-2026-02-17-125410-Picsart-Ai-Image-Enhancer.png",
      pdfUrl: "/Pdf/Pioneering.pdf",
    },
    {
      id: 5,
      title: "Scout Sports",
      image: "https://i.ibb.co/Y741Q9rg/Screenshot-2026-02-17-142119-Picsart-Ai-Image-Enhancer.png",
      pdfUrl: "/Pdf/Paying.pdf",
    },
    {
      id: 6,
      title: "Scout Shop Price List",
      image: "https://i.ibb.co/27Xnmm1r/Untitled-design-9-01.jpg",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
  ];

  const handleReadMore = (url) => {
    setIsLoading(true);
    setActivePdf(url);
  };

  // ESC চাপলে modal বন্ধ হবে
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActivePdf(null);
    };
    if (activePdf) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activePdf]);

  // modal বন্ধ হলে loader reset হবে
  useEffect(() => {
    if (!activePdf) setIsLoading(false);
  }, [activePdf]);

  return (
    <div className="max-h-screen bg-[#0a0f1e] text-white p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Scout Book</h1>
        <p className="max-w-2xl mx-auto text-gray-400">
          Access all Bangladesh Scouts resources and handbooks in one place.
          Select a book to start reading.
        </p>
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-sm btn-outline btn-ghost rounded-full px-6 normal-case"
            onClick={() => navigate("/all-books")}
          >
            See More
          </button>
        </div>
      </div>

      {/* Swiper Slider for all books */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 3, spaceBetween: 35 },
          
        }}
        
         pagination={{
    el: '.custom-pagination', // এখানে attach করব
    clickable: true,
  }}
        autoplay={{ delay: 3500, disableOnInteraction: false ,
            pauseOnMouseEnter: true  
        }}
        
        loop
        className="max-w-7xl mx-auto "
      >
        {books.map((book) => (
          <SwiperSlide key={book.id} className="mx-auto">
            <div className="card bg-[#161b33] shadow-xl border border-gray-800 ">
              <figure className="px-8 pt-6">
                <img
                  src={book.image}
                  alt={book.title}
                  className="rounded-xl h-[280px] w-full object-contain bg-gray-800"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-xl mb-4">{book.title}</h2>
                <div className="card-actions">
                  <button
                    onClick={() => handleReadMore(book.pdfUrl)}
                    className="btn btn-primary bg-indigo-900 border-none hover:bg-indigo-800 rounded-full px-8 text-gray-300 "
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
<div className="custom-pagination flex justify-center mt-6"></div>

      {/* PDF Viewer Modal with Loader */}
      {activePdf && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActivePdf(null)}
        >
          <div
            className="bg-white w-full max-w-5xl h-[85vh] rounded-xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePdf(null)}
              className="absolute top-2 left-2 btn btn-sm text-gray-200 z-10"
            >
              ✕
            </button>

            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-0">
                <Lottie animationData={BgLottie} loop className="w-40 h-40 scale-125" />
              </div>
            )}

            <iframe
              src={`https://docs.google.com/gview?url=${window.location.origin}${activePdf}&embedded=true`}
              title="PDF Viewer"
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoutBookLibrary;
