import React from "react";

const AllBooksPage = () => {
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
      pdfUrl: "/Pdf/Code&Chiper.pdf",
    },
    {
      id: 4,
      title: " Pioneering",
      image: "https://i.ibb.co/Kx9LXS17/Screenshot-2026-02-17-125410-Picsart-Ai-Image-Enhancer.png",
      pdfUrl: "/public/Pdf/Pioneering.pdf",
    },
    {
      id: 5,
      title: "Scout Sports",
      image: "https://i.ibb.co/Y741Q9rg/Screenshot-2026-02-17-142119-Picsart-Ai-Image-Enhancer.png",
      pdfUrl: "/public/Pdf/Paying.pdf",
    },
    {
      id: 6,
      title: "Scout Shop Price List",
      image: "https://i.ibb.co/27Xnmm1r/Untitled-design-9-01.jpg",
      pdfUrl: "/Pdf/bf5f3d2216424f6a84c6eb8cdba173ed.pdf",
    },
  ];

  const handleReadMore = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div  className="min-h-screen bg-[#0a0f1e] text-white p-8   py-10"
    style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop')",
      }}>
      <h1 className="text-4xl font-bold text-blue-500 mb-6 text-center py-4">
        All Scout Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {books.map((book) => (
          <div
            key={book.id}
            className="card bg-[#161b33] shadow-xl border border-gray-800 "
          >
            <figure className="px-6 pt-6">
              <img
                src={book.image}
                alt={book.title}
                className="rounded-xl h-64 w-full object-contain bg-gray-800 cursor-pointer"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl mb-4">{book.title}</h2>
              <div className="card-actions">
                <button
                  onClick={() => handleReadMore(book.pdfUrl)}
                  className="btn btn-primary bg-indigo-900 border-none hover:bg-indigo-800 rounded-full px-8 text-gray-300"
                >
                  Read More Book
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
