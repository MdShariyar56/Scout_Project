import React from "react";

const About = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24 font-sans">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-5xl font-bold text-gray-800 mb-8">About Us</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-justify">
          Scouting is an international youth movement that teaches young people
          leadership, self-reliance, social responsibility, moral values, and
          teamwork. It is comprised of camping, service activities, and skill
          development.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
        <div className="lg:w-1/2 relative h-[450px] w-full">
          <div className="absolute left-0 top-0 w-2/3 h-4/5 z-10">
            <img
              src="https://i.ibb.co/VYrHGN2W/mnb3-l1ms-220926.jpg" // Replace with your actual image path
              alt="Scout Group"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="absolute right-4 bottom-0 w-2/3 h-4/5 z-20">
            <img
              src="https://i.ibb.co/WWBj6fwj/full-shot-scouts-with-map-outdoors.jpg" // Replace with your actual image path
              alt="Scout Leader"
              className="w-full h-full object-cover rounded-lg shadow-2xl border-8 border-white"
            />
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Scouting is a global youth movement, started in 1907 by Robert
            Baden-Powell. The main goal is to develop leadership, social skills,
            empathy and self-reliance among young people. Scout programs are
            conducted through a variety of outdoor activities such as camping,
            hiking, service projects and skill development. Scouts earn various
            ranks and badges, which teach them perseverance, mutual cooperation
            and a sense of social responsibility. Today, there are about 28
            million active Scouts in 160 countries and territories worldwide,
            and its past members number about 300 million. Scouting is not just
            about sports or hanging out; it teaches basic principles and values
            ​​of life, which help to build the character of students. It not
            only connects young people with nature, but also develops their
            social and moral skills. Scouting—teaching leadership and human
            qualities for children and adolescents.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
