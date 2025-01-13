import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loader from "../loader/Loader";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors,loading } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium text-teal-600">
        Connect with Top Healthcare Professionals
      </h1>
      <p className="sm:w-1/3 text-center text-sm">
        Explore a wide range of specialists and book your appointment
        seamlessly.
      </p>

     {
      loading ? <Loader/> : ( <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
          key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-teal-50 hover:bg-teal-100 transition-all duration-500 bg-cover object-cover w-full h-[300px]" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-gray-500"
                } `}
              >
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  }  rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>)
     }

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="border bg-blue-100 shadow-lg text-gray-600 px-12 py-3 rounded-full mt-10 hover:scale-105 transition-all"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;