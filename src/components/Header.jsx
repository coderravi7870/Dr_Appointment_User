import React from "react";
import { assets } from "../assets/assets";
import { MdKeyboardArrowRight } from "react-icons/md";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-[#008080] rounded-lg px-6 md:px-10 "
    style={{
      background: "url(hero.jpg)"
    }}>
      {/* ----------left side--------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-8 m-auto md:py-[10vw] md:mb-[-30px]"
      
      >
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight text-[#A8FFEB]">
        Schedule Your Appointment <br /> With Expert Doctors Today{" "}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 bg-[#A8FFEB]"
        >
          Book appointment{" "}
          <MdKeyboardArrowRight size={22} />
        </a>
      </div>
      {/* ----------right side--------- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
