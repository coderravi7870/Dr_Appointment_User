import React, { useEffect, useState } from "react";
import { MdOutlineArrowCircleUp } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isVisible ,setIsVisible] =useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ----------left section------- */}

        <div>
          <img className="w-32 h-32 border rounded-full" src="logo.png" alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Our platform connects you with trusted and experienced doctors,
            making healthcare accessible and hassle-free. Book appointments,
            consult with specialists, and manage your health—all in one place.
          </p>
        </div>

        {/* ----------Center Section ------------ */}

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <Link
              to="/"
              onClick={() => {
                scrollTo(0, 0);
              }}
              className="cursor-pointer hover:text-red-800"
            >
              Home
            </Link>
            <Link
              to="/contact"
              onClick={() => {
                scrollTo(0, 0);
              }}
              className="cursor-pointer hover:text-red-800"
            >
              Contact us
            </Link>
            <Link
              to="/about"
              onClick={() => {
                scrollTo(0, 0);
              }}
              className="cursor-pointer hover:text-red-800"
            >
              About us
            </Link>
            <Link to="#" className="cursor-pointer hover:text-red-800">
              Privacy Policy
            </Link>
          </ul>
        </div>

        {/* -------------right section---------- */}
        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-7870375975</li>
            <a
              href="mailto:rksraj7870@gmail.com"
              className="text-blue-500 underline"
            >
              rksraj7870@gmail.com
            </a>
          </ul>
        </div>
      </div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal-700 transition duration-300"
        >
          <MdOutlineArrowCircleUp size={50} className="text-teal-600"/>
        </button>
      )}
      <div>
        {/* --------Copyright text------ */}
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Prescripto - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
