/* eslint-disable no-unused-vars */
import React from "react";
import { AiOutlineUser, AiOutlineUnlock } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useMutateHook from "../utils/useMutateHook";
import { API } from "../API/API";
import { handleEnterKeyDown } from "../components/commonFunctions/HandleEnterInput";

const SignUpPage = () => {
  // Simulating your hooks and functions
  const Navigation = useNavigate();
  const { mutate, isLoading } = useMutateHook(
    "/login",
    "Register Successfull",
    "Register Failed! Please try again"
  );
  const API = {
    Register: "/api/register",
  };

  const options = [
    { value: "teacher", label: "Teacher" },
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };
    mutate({ url: API.Register, input: formData });
  };

  const inputWrapper =
    "group relative flex items-center gap-3 border border-gray-300 bg-white rounded-lg px-4 py-3 mb-4 shadow-sm transition-all duration-300 hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500";

  const dropdownStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.2)" : "none",
      padding: "6px",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "#60A5FA",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50,
      borderRadius: "8px",
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3B82F6"
        : state.isFocused
        ? "#EBF4FF"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      "&:hover": {
        backgroundColor: state.isSelected ? "#3B82F6" : "#EBF4FF",
      },
    }),
  };

  const handleClickLogin = () => {
    Navigation("/");
  };

  // Custom Select component to match your logic
  const CustomSelect = ({ name, options, placeholder, styles }) => {
    return (
      <div className="relative">
        <div className={inputWrapper}>
          <BsFillKeyFill className="text-gray-500 text-lg group-focus-within:text-blue-500 transition-colors duration-300" />
          <select
            name={name}
            className="w-full outline-none text-sm bg-transparent appearance-none cursor-pointer"
            style={{ color: "#374151" }}
            required
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-center relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 text-white mb-3">
                <span className="text-3xl font-bold">Welcome to</span>
                <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
                  <span className="text-blue-600 font-bold text-2xl">
                    Grades
                  </span>
                </div>
              </div>
              <p className="text-blue-100 text-lg font-medium">
                Create your account
              </p>
              <div className="mt-4 w-20 h-1 bg-white rounded-full mx-auto opacity-80"></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => handleSubmit(e)} onKeyDown={handleEnterKeyDown}>
            <div className="px-8 py-8">
              <div className="space-y-1">
                {/* Username */}
                <div className={inputWrapper}>
                  <AiOutlineUser className="text-gray-500 text-lg group-focus-within:text-blue-500 transition-colors duration-300" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your name"
                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                    required
                  />
                </div>

                {/* Email */}
                <div className={inputWrapper}>
                  <MdEmail className="text-gray-500 text-lg group-focus-within:text-blue-500 transition-colors duration-300" />
                  <input
                    type="email"
                    id="emailId"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                    required
                  />
                </div>

                {/* Password */}
                <div className={inputWrapper}>
                  <AiOutlineUnlock className="text-gray-500 text-lg group-focus-within:text-blue-500 transition-colors duration-300" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className={inputWrapper}>
                  <BsFillKeyFill className="text-gray-500 text-lg group-focus-within:text-blue-500 transition-colors duration-300" />
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                    required
                  />
                </div>

                {/* Role Selection */}
                <div className="mb-6">
                  <CustomSelect
                    name="role"
                    options={options}
                    placeholder="Select your role"
                    styles={dropdownStyles}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Registering...
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>

                  <button
                    onClick={handleClickLogin}
                    type="button"
                    className="flex-1 bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-blue-600 font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={handleClickLogin}
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 bg-gradient-to-r from-blue-800 to-indigo-800 text-white text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure Registration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
