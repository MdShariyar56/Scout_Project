import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Student = () => {
  const students = [
    {
      id: 1,
      name: "MD Abul Kalam",
      department: "Computer Science Department",
      designation: "Instructor",
      image: "https://i.ibb.co/8gf7cgqJ/image.jpg",
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
    {
      id: 4,
      name: "MD Abul Kalam",
      department: "Computer Science Department",
      designation: "Instructor",
      image: "https://i.ibb.co/8gf7cgqJ/image.jpg",
    },
  ];

  return (
    <div className="bg-[#020617] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
            Scout Unite Student
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base mb-6">
            Meet our active students who are learning and growing with Scouts.
          </p>
          <button className="btn btn-outline hover:bg-blue-500  rounded-full px-6 normal-case">
            See More
          </button>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          pagination={{
            el: ".student-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          className="pb-4"
        >
          {students.map((student) => (
            <SwiperSlide key={student.id} className="px-2">
              <div className="card bg-[#0f172a] shadow-xl border border-blue-900/30 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                <figure className="relative pt-6 px-6">
                  <div className="rounded-xl overflow-hidden bg-blue-500/20">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-full h-[260px] object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-blue-400 text-black font-semibold px-6 py-1 rounded-sm text-sm">
                    Student
                  </div>
                </figure>

                <div className="card-body items-center text-center pt-8">
                  <h3 className="card-title text-blue-400 text-xl font-bold">
                    {student.name}
                  </h3>
                  <div className="text-gray-400 text-sm space-y-1">
                    <p>Dep: {student.department}</p>
                    <p>Designation: {student.designation}</p>
                  </div>
                  <div className="card-actions mt-4">
                    <button className="btn btn-outline btn-primary btn-sm rounded-full px-8">
                      See More
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="student-pagination flex justify-center mt-6"></div>
      </div>
    </div>
  );
};

export default Student;
