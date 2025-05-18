import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineUnlock, AiFillFire } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';



const ForgotPassPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        NewPassword: "",
        confirmPassword: "",
    });
    let Navigation = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", formData);
    };

    const handle = () => {
        Navigation('/login')
    }

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
                    <h1>Forgot Password</h1>
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
                        name="NewPassword"
                        value={formData.NewPassword}
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

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassPage;
