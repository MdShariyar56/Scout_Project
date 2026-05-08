import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  // Get saved role
  const role = localStorage.getItem("role");

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Role based API
      const url =
        role === "teacher"
          ? "https://bbpi-rover.vercel.app/scoute/auth/teacher/login/"
          : "https://bbpi-rover.vercel.app/scoute/auth/student/login/";

      const res = await axios.post(url, {
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);

      // Save user info
      localStorage.setItem("user", JSON.stringify(res.data));

      Swal.fire({
        title: "Success!",
        text: `${
          role === "teacher"
            ? "Teacher Successful Login"
            : "Student Successful Login"
        }`,
        icon: "success",
        confirmButtonColor: "#3b82f6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Invalid email or password",
        icon: "error",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop')`,
      }}
    >
      <div className="card w-full max-w-md text-white">
        <div className="card-body">
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-blue-500 p-1">
                <img
                  src="https://i.ibb.co/HpXs6Wcm/Ellipse-3.png"
                  alt="Logo"
                  className="rounded-full"
                />
              </div>

              <div className="text-left">
                <h1 className="text-5xl font-bold text-blue-500 tracking-wider leading-none">
                  BBPI
                </h1>

                <p className="text-xs font-semibold tracking-widest text-gray-300">
                  ROVER UNITE
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-4">Login Your Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                  Email
                  <span className="text-red-500">*</span>
                </span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-blue-600 rounded-l-md w-10 justify-center z-10">
                  <FaUser className="text-white" />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Registered Email"
                  className="input input-bordered w-full pl-12 bg-gray-900/50 border-blue-500/50 focus:border-blue-400 text-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">
                  Login Password
                  <span className="text-red-500">*</span>
                </span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-blue-600 rounded-l-md w-10 justify-center z-10">
                  <FaLock className="text-white" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input input-bordered w-full pl-12 bg-gray-900/50 border-blue-500/50 focus:border-blue-400 text-white"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember + Submit */}
            <div className="flex items-center justify-between py-2">
              <label className="label cursor-pointer flex gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary border-white"
                />

                <span className="label-text text-white">Remember me</span>
              </label>

              <button
                type="submit"
                className="btn btn-primary w-1/2 normal-case text-lg shadow-lg shadow-blue-500/50"
              >
                Submit
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-between text-sm mt-4">
              <Link to="/register" className="link link-hover text-blue-400">
                Register new account
              </Link>

              <a href="#" className="link link-hover text-blue-400">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
