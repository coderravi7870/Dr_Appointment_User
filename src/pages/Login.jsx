import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(UserContext);

  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center mt-20"
    >
      <div
        className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg"
        style={{
          background: "url(hero.jpg)",
        }}
      >
        <p className="text-2xl font-semibold text-teal-400">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-teal-400">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p className="text-teal-400">Full Name</p>
            <input
              className="border border-zinc-300 focus:outline-teal-400 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter full name"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="text-teal-400">Email</p>
          <input
            className="border border-zinc-300 focus:outline-teal-400 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="w-full">
          <p className="text-teal-400">Password</p>
          <input
            className="border border-zinc-300 focus:outline-teal-400 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white w-full py-2 rounded-md text-base"
        >
          {loading ? (
            <div className="w-full flex justify-center"><Loader height={24} /></div>
          ) : state === "Sign Up" ? (
            "Create Account"
          ) : (
            "Login"
          )}
        </button>
        {state === "Sign Up" ? (
          <p className="text-teal-400">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-red-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-teal-400">
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-red-400 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
