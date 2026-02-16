import React from "react";

const Student = () => {
  const teachers = [
    {
      id: 1,
      name: "MD Abul Kalam",
      department: "Computer Science Department",
      designation: "Instructor",
      image: "https://i.ibb.co/8gf7cgqJ/image.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      name: "MD Abul Kalam",
      department: "Computer Science Department",
      designation: "Instructor",
      image: "https://i.ibb.co/8gf7cgqJ/image.jpg",
    },
    {
      id: 3,
      name: "MD Abul Kalam",
      department: "Computer Science Department",
      designation: "Instructor",
      image: "https://i.ibb.co/8gf7cgqJ/image.jpg",
    },
  ];

  return (
    <div className="bg-[#020617] text-white py-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
            Scout Unite Student
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <button className="btn btn-outline btn-sm rounded-full px-6 border-gray-700 hover:bg-gray-800 text-gray-400">
            See More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="card bg-[#0f172a] shadow-xl border border-blue-900/30 overflow-hidden"
            >
              <figure className="relative pt-6 px-6">
                <div className="rounded-xl overflow-hidden bg-blue-500/20">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#2dd4bf] text-black font-semibold px-8 py-1 rounded-sm text-sm">
                  Teacher
                </div>
              </figure>

              <div className="card-body items-center text-center pt-8">
                <h3 className="card-title text-blue-400 text-2xl font-bold">
                  {teacher.name}
                </h3>
                <div className="text-gray-400 text-sm space-y-1">
                  <p>Dep: {teacher.department}</p>
                  <p>Designation: {teacher.designation}</p>
                </div>
                <div className="card-actions mt-4">
                  <button className="btn btn-outline btn-primary btn-sm rounded-full px-8">
                    See More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600"></span>
          <span className="h-3 w-3 rounded-full bg-gray-600"></span>
          <span className="h-3 w-3 rounded-full bg-gray-600"></span>
        </div>
      </div>
    </div>
  );
};

export default Student;
