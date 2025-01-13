import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="mt-20">
      <div className="text-center text-2xl pt-10 text-teal-500">
        <p>
          CONTACT <span className="text-teal-700 font-semibold"> AS</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-teal-600">OUR OFFICE</p>
          <p className="text-gray-500">
            12 Willms Station <br /> Suite 50, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: +1-222-343-3123 <br />
            Email:{" "}
            <a
              href="mailto:rksraj7870@gmail.com"
              className="text-blue-500 underline"
            >
              rksraj7870@gmail.com
            </a>
          </p>
          <p className="font-semibold text-lg text-teal-600">
            CAREERS AT PRESCRIPTO
          </p>
          <p className="text-gray-600">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
