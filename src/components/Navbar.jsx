import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserContext } from "../context/UserContext";
import crossIcon from "../assets/cross_icon.png";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData, token, setToken } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between text-sm py-1 border-b border-b-gray-400 bg-white z-50 px-2">
      <div className="w-16 h-16">
        <img
          onClick={() => navigate("/")}
          className="rounded-full bg-cover object-cover border cursor-pointer"
          src="logo.png"
          alt=""
        />
      </div>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr
            className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto"
            hidden
          />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr
            className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto"
            hidden
          />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr
            className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto"
            hidden
          />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr
            className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto"
            hidden
          />
        </NavLink>
        <NavLink to="https://dr-appointment-admin.vercel.app" target="_blank">
          <li className="border px-3 py-1 rounded-full border-gray-500 text-gray-600">
            Admin Panel
          </li>
          <hr
            className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto"
            hidden
          />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group">
            <img
              className="w-8 h-8 bg-cover object-cover rounded-full"
              src={userData?.image}
              alt=""
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="relative">
              <div className="absolute top-0 right-0 pt-8 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("my-appointment")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-5 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        {/* ------mobile menu------ */}
        <div
          className={` ${
            showMenu ? "fixed h-[300px]" : "h-0 w-0"
          } md:hidden right-10 top-10 bottom-0 z-20 overflow-hidden bg-stone-100 transition-all`}
        >
          <div className="flex items-center justify-start p-2">
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={crossIcon}
              alt=""
            />
          </div>
          <ul className="flex flex-col justify-start p-2 text-lg font-medium text-teal-800">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block hover:bg-teal-200">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block hover:bg-teal-200">All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block hover:bg-teal-200">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block hover:bg-teal-200">Contact</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="https://dr-appointment-admin.vercel.app"
              target="_blank"
            >
              <p className="px-4 py-2 border rounded-xl inline-block hover:bg-teal-200">
                Admin Panel
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
