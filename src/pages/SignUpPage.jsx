import React from "react";
import { AiOutlineUser, AiOutlineUnlock } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useMutateHook from "../utils/useMutateHook";
import { API } from "../API/api";
import { handleEnterKeyDown } from "../components/commonFunctions/HandleEnterInput";

const SignUpPage = () => {
  const Navigation = useNavigate();
  const { mutate, isLoading } = useMutateHook(
    "/login",
    "Register Successfull",
    "Register Failed! Please try again"
  );

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
    "relative flex items-center gap-3 border border-gray-300 bg-white rounded-lg px-4 py-3 mb-6 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200";

  const handleClickLogin = () => {
    Navigation("/");
  };

  const CustomSelect = ({ name, options, placeholder }) => (
    <div className="relative">
      <div className={inputWrapper}>
        <BsFillKeyFill className="text-gray-500 text-lg" />
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#99C0FF] px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
             <img src="src\assets\GRADES.svg" alt="Logo" className="h-8 w-auto mx-auto" />
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              Create your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} onKeyDown={handleEnterKeyDown}>
            <div className="space-y-6">
              {/* Username */}
              <div className={inputWrapper}>
                <AiOutlineUser className="text-gray-500 text-xl flex-shrink-0" />
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
                <MdEmail className="text-gray-500 text-xl flex-shrink-0" />
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
                <AiOutlineUnlock className="text-gray-500 text-xl flex-shrink-0" />
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
                <BsFillKeyFill className="text-gray-500 text-xl flex-shrink-0" />
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
              <CustomSelect
                name="role"
                options={options}
                placeholder="Select your role"
              />

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </button>

              {/* Sign In Link */}
              <div className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleClickLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-150 hover:underline"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;