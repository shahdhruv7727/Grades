import React from "react";
import { AiFillFire, AiOutlineUser, AiOutlineUnlock } from "react-icons/ai";
import { BsFillKeyFill, BsFillPersonFill } from "react-icons/bs";
import Select from "react-select";

const SignUpPage = () => {
  const options = [
    { value: "teacher", label: "Teacher" },
    { value: "admin", label: "Admin" },
  ];

  const dropdownStyles = {
    control: () =>
      "border border-gray-300 rounded-md px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500",
    input: () => "text-gray-800",
    placeholder: () => "text-gray-400",
    singleValue: () => "text-gray-800",
    menu: () =>
      "bg-white border border-gray-200 mt-1 rounded-md shadow-lg z-50",
    option: ({ isFocused, isSelected }) =>
      `px-4 py-2 cursor-pointer ${
        isSelected ? "bg-blue-600 text-white" : isFocused ? "bg-blue-100" : ""
      }`,
  };

  return (
    <div className="flex justify-center items-center overflow-hidden m-0 h-[90vh] w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md flex flex-col items-center w-11/12"
      >
        <div className="flex items-center text-3xl font-bold gap-2 mb-6">
          <h1>Welcome to Grades!</h1>
          <AiFillFire className="text-orange-500" />
        </div>

        <div className="flex items-center border border-gray-300 rounded w-full px-3 py-2 mb-4">
          <AiOutlineUser className="text-gray-600 mr-2" />
          <input
            type="text"
            name="username"
            placeholder="What is your name?"
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded w-full px-3 py-2 mb-4">
          <AiOutlineUnlock className="text-gray-600 mr-2" />
          <input
            type="password"
            name="password"
            placeholder="What password you wanna set?"
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded w-full px-3 py-2 mb-4">
          <BsFillKeyFill className="text-gray-600 mr-2" />
          <input
            type="password"
            name="confirm_password"
            placeholder="Please enter your password again!"
            className="w-full outline-none"
          />
        </div>

        <div className="w-full mb-6">
          <Select
            options={options}
            placeholder="Please select your role"
            className={dropdownStyles}
          />
        </div>

        <div className="flex justify-between w-full gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
          >
            Register Yourself!
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded transition duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
