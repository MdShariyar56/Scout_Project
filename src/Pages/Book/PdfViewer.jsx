import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ScoutBookLibrary = () => {
  const navigate = useNavigate();
  const [activePdf, setActivePdf] = useState(null);

  const books = [
    {
      id: 1,
      title: "গঠন ও নিয়ম",
      image: "https://i.ibb.co/677CPK7J/554817.jpg",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
    {
      id: 2,
      title: "ট্রেনার্স হ্যান্ডবুক",
      image: "https://i.ibb.co/677CPK7J/554817.jpg",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
    {
      id: 3,
      title: "সদস্য ব্যাজ",
      image: "https://i.ibb.co/677CPK7J/554817.jpg",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
  ];

  const firstThreeBooks = books.slice(0, 3);

  const handleReadMore = (url) => {
    setActivePdf(url);
  };

  // ESC চাপলে modal বন্ধ হবে
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setActivePdf(null);
      }
    };

    if (activePdf) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activePdf]);

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {firstThreeBooks.map((book) => (
          <div
            key={book.id}
            className="card bg-[#161b33] shadow-xl border border-gray-800 transition-transform hover:scale-105"
          >
            <figure className="px-4 pt-6">
              <img
                src={book.image}
                alt={book.title}
                className="rounded-xl h-[280px] w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl mb-4">{book.title}</h2>
              <div className="card-actions">
                <button
                  onClick={() => handleReadMore(book.pdfUrl)}
                  className="btn btn-primary bg-indigo-900 border-none hover:bg-indigo-800 rounded-full px-8 text-gray-300"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Viewer Modal using Google Docs */}
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
              className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost text-black"
            >
              ✕
            </button>

            <iframe
              src={`https://docs.google.com/gview?url=${window.location.origin}${activePdf}&embedded=true`}
              title="PDF Viewer"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoutBookLibrary;
