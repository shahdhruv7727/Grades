import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineUnlock, AiFillFire } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from '../components/commonFunctions/Toast';
import axios from 'axios';



const LoginPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  let Navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log({ email, password, role });
    // Add your login logic here
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitted:", formData);
  const { email, password } = formData;

  try {
    const response = await axios.post('http://localhost:8002/api/users/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log(response);

    if (response.status === 201) {
      Toast({ type: "success", message: "Login successful!" });
      Navigation('/'); 
    }
  } catch (error) {
    console.error("Error during login:", error);

    const errorMessage = error?.response?.data?.msg || "Login failed. Please try again.";
    Toast({ type: "error", message: errorMessage });
  }
};


  const inputWrapper =
    "flex items-center gap-3 border border-gray-300 bg-white rounded-md px-4 py-3 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500";


  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white px-10 py-12 rounded-none shadow-none sm:rounded-xl sm:shadow-xl sm:w-[480px]"
      >
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 mb-8">
          <AiFillFire className="text-orange-500" />
          <h1>Login to Grades</h1>
        </div>

        {/* <div className={inputWrapper}>
          <AiOutlineUser className="text-gray-500 text-lg" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div> */}

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
        <div className="w-full text-left mb-2 text-blue-600">
          <Link to="/forgotpass">
            Forgot Password?
          </Link>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-300"
          >
            Login
          </button>
        </div>
        <div className="mt-2">
          Don't have an Account?
          <Link to='/' className='px-1 text-blue-600'>SignUp</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
