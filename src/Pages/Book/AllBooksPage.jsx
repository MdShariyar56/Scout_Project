import React from "react";

const AllBooksPage = () => {
  const books = [
    {
      id: 1,
      title: "গঠন ও নিয়ম",
      image: "https://via.placeholder.com/300x400",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
    {
      id: 2,
      title: "ট্রেনার্স হ্যান্ডবুক",
      image: "https://via.placeholder.com/300x400",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
    {
      id: 3,
      title: "সদস্য ব্যাজ",
      image: "https://via.placeholder.com/300x400",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
    {
      id: 4,
      title: "সদস্য ব্যাজ 2",
      image: "https://via.placeholder.com/300x400",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
    {
      id: 5,
      title: "সদস্য ব্যাজ 3",
      image: "https://via.placeholder.com/300x400",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
    {
      id: 6,
      title: "সদস্য ব্যাজ 4",
      image: "https://via.placeholder.com/300x400",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
  ];

  const handleReadMore = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-8 font-sans">
      <h1 className="text-4xl font-bold text-blue-500 mb-6 text-center">
        All Scout Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {books.map((book) => (
          <div
            key={book.id}
            className="card bg-[#161b33] shadow-xl border border-gray-800 transition-transform hover:scale-105 cursor-pointer"
          >
            <figure className="px-6 pt-6">
              <img
                src={book.image}
                alt={book.title}
                className="rounded-xl h-64 w-full object-cover"
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
    </div>
  );
};

export default AllBooksPage;
