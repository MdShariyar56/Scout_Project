import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaPhoneAlt,
  FaLock,
  FaCamera,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const TeacherRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    gender: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Cleanup preview
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Only image files are allowed",
      });
      return;
    }

    // Check image size
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Image size should be less than 2MB",
      });
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please upload your profile image",
      });
      return;
    }

    for (const key in formData) {
      if (formData[key] === "") {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Please fill all the fields",
        });
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Passwords do not match",
      });
      return;
    }

    try {
      const teacherData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        designation: formData.designation,
      };

      const res = await axios.post(
        "https://bbpi-rover.vercel.app/scoute/auth/teacher/signup/",
        teacherData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);

      Swal.fire({
        title: "Registered Successfully!",
        text: "Your account has been created.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });

      // Reset form
      setFormData({
        fullName: "",
        designation: "",
        email: "",
        phone: "",
        gender: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        password: "",
        confirmPassword: "",
      });

      setImage(null);
      setPreview(null);

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-4xl p-8 md:p-6 text-white">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center p-1 overflow-hidden">
              <img
                src="https://i.ibb.co/HpXs6Wcm/Ellipse-3.png"
                alt="Logo"
                className="w-full h-full object-contain"
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

          <h2 className="text-3xl font-bold mt-1">
            Create an account
          </h2>

          <span className="text-lg md:text-xl font-semibold text-blue-500">
            Register to start your Teacher Account
          </span>

          {/* Upload Image */}
          <label className="mt-4 cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="relative w-28 h-28 rounded-xl border-2 border-dashed border-blue-500/70 flex items-center justify-center overflow-hidden group-hover:border-blue-400 transition">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="flex flex-col items-center text-white text-xs opacity-80">
                  <FaCamera className="text-2xl mb-1" />
                  Upload Photo
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          </label>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-white">
                Full Name
                <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-blue-500 rounded-l-sm h-full w-10 justify-center z-10">
                <FaUser className="text-white" />
              </span>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="input input-bordered w-full pl-12 bg-gray-900/50 border-blue-500/50 focus:border-blue-400 text-white"
              />
            </div>
          </div>

          {/* Designation */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-white">
                Designation
                <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-blue-600 rounded-l-sm h-full w-10 justify-center z-10">
                <FaIdCard className="text-white" />
              </span>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Designation"
                className="input input-bordered w-full pl-12 bg-gray-900/50 border-blue-500/50 focus:border-blue-400 text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-white">
                Login Email
                <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-blue-600 rounded-l-sm h-full w-10 justify-center z-10">
                <FaEnvelope className="text-white" />
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-full pl-12 bg-gray-900/50 border-blue-500/50 focus:border-blue-400 text-white"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-white">
                Mobile Number
                <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-blue-600 rounded-l-sm h-full w-10 justify-center z-10">
                <FaPhoneAlt className="text-white" />
              </span>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input input-bordered w-full pl-12 bg-gray-900/50 border-blue-500/50 focus:border-blue-400 text-white"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-white">
                Gender
                <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="flex w-full gap-2">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      gender: g,
                    }))
                  }
                  className={`flex-1 py-2 rounded-lg text-white font-semibold transition
                  ${
                    formData.gender === g
                      ? "bg-blue-600 shadow-lg"
                      : "bg-gray-900/50 hover:bg-blue-600"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Birth Date */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-white">
                Birth of Date
                <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="grid grid-cols-3 gap-1">
              <input
                type="text"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleChange}
                placeholder="Day"
                className="input input-bordered bg-gray-900/50 border-blue-500/50 text-center"
              />

              <input
                type="text"
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleChange}
                placeholder="Month"
                className="input input-bordered bg-gray-900/50 border-blue-500/50 text-center"
              />

              <input
                type="text"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                placeholder="Year"
                className="input input-bordered bg-gray-900/50 border-blue-500/50 text-center"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-white">
                Login Password
                <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-blue-600 rounded-l-sm h-full w-10 justify-center z-10">
                <FaLock className="text-white" />
              </span>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered w-full pl-12 pr-10 bg-gray-900/50 border-blue-500/50 focus:border-blue-400 text-white"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-white">
                Confirm Password
                <span className="text-red-500">*</span>
              </span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-blue-600 rounded-l-sm h-full w-10 justify-center z-10">
                <FaLock className="text-white" />
              </span>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="input input-bordered w-full pl-12 pr-10 bg-gray-900/50 border-blue-500/50 focus:border-blue-400 text-white"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full md:w-1/2 block mx-auto bg-blue-600 border-none text-white text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;