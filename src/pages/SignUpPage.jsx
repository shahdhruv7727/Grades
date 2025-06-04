import React, { useState } from "react";
import { AiOutlineUser, AiOutlineUnlock, AiFillFire } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import Select from "react-select";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "../components/commonFunctions/Toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    role: null,
  });
  let Navigation = useNavigate();

  const options = [
    { value: "teacher", label: "Teacher" },
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, role: selectedOption?.value }));
  };
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log("Submitted:", formData);
    const { username, email, password, role } = formData;
    try {
    const response = await axios.post('http://localhost:8002/api/users/register', {
      username,
      password,
      email,
      role
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);

      if (response.status === 201) {

        Toast({ type: "success", message: "Registration successful!" });
      }
    } catch (error) {
      console.error("Error during registration:", error );
      Toast({ type: "error", message: error.response.data.msg});
    }



    // });

    // const registrationData = await response.json();
  };

  const inputWrapper =
    "flex items-center gap-3 border border-gray-300 bg-white rounded-md px-4 py-3 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500";

  const dropdownStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      BiBorderBottom: "1px solid black",
      borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB",
      boxShadow: state.isFocused ? "0 0 0 1px #3B82F6" : "none",
      padding: "2px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50,
    }),
  };

  const handleClickLogin = () => {
    Navigation("/login");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white px-10 py-10 rounded-none shadow-none sm:rounded-xl sm:shadow-xl sm:w-[480px]"
      >
        {/* <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 mb-8">
          <AiFillFire className="text-orange-500" /> 
          <h1 className="flex">Welcome to </h1>
          <img src="src/assets/GradesLogoT.png" alt="Grades Logo" className="h-18 object-contain" />
        </div> */}
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 mb-7">
          <span>Welcome to</span>
          <img src="src/assets/GradesLogoTc.png" alt="Grades Logo" className="h-10 object-contain" />
        </div>

        {/* <div className="flex items-center justify-center p-1 m-1 mb-4">
            <span className="h-[3px] bg-blue-500 w-full"></span>
        </div> */}

        <div className={inputWrapper}>
          <AiOutlineUser className="text-gray-500 text-lg" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        <div className={inputWrapper}>
          <MdEmail className="text-gray-500 text-lg" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        <div className={inputWrapper}>
          <AiOutlineUnlock className="text-gray-500 text-lg" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        <div className={inputWrapper}>
          <BsFillKeyFill className="text-gray-500 text-lg" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        <div className="mb-6">
          <Select
            value={formData.role !== null ? options.filter((role) => role.value === formData.role) : ''}
            onChange={handleRoleChange}
            options={options}
            placeholder="Select your role"
            styles={dropdownStyles}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-300"
          >
            Register
          </button>
          <button
            onClick={handleClickLogin}
            type="button"
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-blue-600 font-medium py-2 rounded-md transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
