import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ChevronDown } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "BRAHMANBARIA POLYTECHNIC INSTITUTE ROVER UNIT",
    subtitle: [
      "বদভ্যাস হচ্ছে নষ্ট দাঁতের মত, যা উপড়ে ফেলাই উত্তম -লাইফস স্ন্যাগস",
      "একঝলক প্রাণখোলা হাসি মনটাকে পরিস্কার করে ফেলে -রোভারিং টু সাকসেস",
      "একজোড়া প্রশিক্ষন প্রাপ্ত চোখ এক ডজন প্রশিক্ষনহীন চোখের সমান -এইডস টু স্কাউটিং",
    ],
    image: "https://i.ibb.co/FvNY4mk/mnaq-fmc6-220926.jpg",
  },
  {
    id: 2,
    title: "BRAHMANBARIA POLYTECHNIC INSTITUTE ROVER UNIT",
    subtitle: [
      "মদ্যপায়ী লোকের স্কাউট হওয়া অসম্ভব -স্কাউটিং ফর বয়েজ",
      "খুব খারাপ সময়েও সাধারনত একটা খুশির দিক থাকে -হোয়াইট স্কাউট ক্যান ডু",
      "বিশ্রাম বলতে আমি আলস্য বুঝি না, বরং কাজের পরিবর্তন বুঝি -রোভারিং টু সাকসেস",
    ],
    image: "https://i.ibb.co/VYrHGN2W/mnb3-l1ms-220926.jpg",
  },
  {
    id: 3,
    title: "BRAHMANBARIA POLYTECHNIC INSTITUTE ROVER UNIT",
    subtitle: [
      "শখ হল শয়তানের ছোট ছোট খেলার প্রতিষেধক -এইডস টু স্কাউট মাস্টারশিপ",
      "মেয়েদের মধ্যে অনেক মেয়ে আছে, আবার পুতুলও আছে -রোভারিং টু সাকসেস",
      "পৃথিবীটাকে যেমন পেয়েছ তার চেয়ে সুন্দর করে রেখে যেতে চেষ্টা করবে -বিপির শেষ বাণী",
    ],
    image: "https://i.ibb.co/WWBj6fwj/full-shot-scouts-with-map-outdoors.jpg",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <Swiper
        spaceBetween={40}
        centeredSlides
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[65vh] md:h-[85vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[65vh] md:h-[85vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

              <motion.div
                className="relative z-10 flex flex-col justify-center h-full 
                           px-6 md:px-20 
                           text-white max-w-6xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1
                  className="text-lg  sm:text-2xl md:text-4xl lg:text-3xl 
                               font-bold tracking-wide mb-6 
                               text-white leading-snug "
                >
                  <Typewriter
                    words={[slide.title]}
                    loop={false}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                  />
                </h1>

                <ul
                  className="list-disc list-outside pl-6 
                             space-y-3 
                             text-sm sm:text-base md:text-lg lg:text-xl
                             text-gray-200 
                             leading-relaxed 
                             max-w-4xl"
                >
                  {slide.subtitle.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white"
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown size={32} className="opacity-80" />
      </motion.div>
    </div>
  );
};

export default HeroSlider;
