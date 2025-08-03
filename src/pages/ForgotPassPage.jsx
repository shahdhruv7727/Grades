import React, { useState } from 'react';
import { AiOutlineUnlock } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ForgotPassPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        NewPassword: "",
        confirmPassword: "",
    });
    const Navigation = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", formData);
    };

    const handle = () => {
        Navigation('/login');
    };

    const inputWrapper =
        "relative flex items-center gap-3 border border-gray-300 bg-white rounded-lg px-4 py-3 mb-6 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200";

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#99C0FF] px-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-3xl font-bold text-blue-700">Forgot Password</span>
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Reset your password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className={inputWrapper}>
                                <MdEmail className="text-gray-500 text-xl flex-shrink-0" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400 text-gray-700"
                                    required
                                />
                            </div>

                            <div className={inputWrapper}>
                                <AiOutlineUnlock className="text-gray-500 text-xl flex-shrink-0" />
                                <input
                                    type="password"
                                    name="NewPassword"
                                    value={formData.NewPassword}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400 text-gray-700"
                                    required
                                />
                            </div>

                            <div className={inputWrapper}>
                                <BsFillKeyFill className="text-gray-500 text-xl flex-shrink-0" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm new password"
                                    className="w-full outline-none text-sm bg-transparent placeholder-gray-400 text-gray-700"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200"
                            >
                                Submit
                            </button>

                            <div className="text-center text-gray-600 text-sm mt-4">
                                Remember your password?{" "}
                                <button
                                    type="button"
                                    onClick={handle}
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

export default ForgotPassPage;