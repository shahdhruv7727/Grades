import { AiOutlineUser, AiOutlineUnlock } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";
import Select from "react-select";
import { MdEmail } from "react-icons/md";
import useMutateHook from "../utils/useMutateHook";
import { API } from "../API/API";
import { useNavigate } from "react-router-dom";
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
    Navigation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated Vector Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#764ba2" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f093fb" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f5576c" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Floating geometric shapes */}
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="url(#gradient1)"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,10; 0,0"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>

          <polygon
            points="200,150 250,100 300,150 250,200"
            fill="url(#gradient2)"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 250 150; 360 250 150"
              dur="20s"
              repeatCount="indefinite"
            />
          </polygon>

          <circle
            cx="1300"
            cy="200"
            r="80"
            fill="url(#gradient1)"
            opacity="0.4"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -30,20; 0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>

          <path
            d="M400,300 Q500,200 600,300 T800,300"
            stroke="url(#gradient2)"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,400; 400,0; 0,400"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>

          <rect
            x="1100"
            y="500"
            width="60"
            height="60"
            fill="url(#gradient1)"
            opacity="0.3"
            rx="10"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 1130 530; 45 1130 530; 0 1130 530"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>

          <ellipse
            cx="300"
            cy="600"
            rx="40"
            ry="60"
            fill="url(#gradient2)"
            opacity="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1; 1.2; 1"
              dur="5s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-0 sm:max-w-lg lg:max-w-xl">
        <form onSubmit={handleSubmit} onKeyDown={handleEnterKeyDown}>
          <div className="bg-white/90 backdrop-blur-xl px-6 py-8 sm:px-10 sm:py-10 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Subtle inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-10 text-center mb-8">
              <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <div className="h-8 sm:h-10 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">GRADES</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Create your account to get started
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 relative z-10">
              <div className={inputWrapper}>
                <AiOutlineUser className="text-gray-500 text-lg flex-shrink-0" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your name"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                  onKeyDown={handleEnterKeyDown}
                  required
                />
              </div>

              <div className={inputWrapper}>
                <MdEmail className="text-gray-500 text-lg flex-shrink-0" />
                <input
                  type="email"
                  id="emailId"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                  onKeyDown={handleEnterKeyDown}
                  required
                />
              </div>

              <div className={inputWrapper}>
                <AiOutlineUnlock className="text-gray-500 text-lg flex-shrink-0" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                  onKeyDown={handleEnterKeyDown}
                  required
                />
              </div>

              <div className={inputWrapper}>
                <BsFillKeyFill className="text-gray-500 text-lg flex-shrink-0" />
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                  onKeyDown={handleEnterKeyDown}
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 border border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400 transition-all duration-300">
                  <BsFillKeyFill className="text-gray-500 text-lg flex-shrink-0" />
                  <select
                    name="role"
                    className="w-full outline-none text-sm bg-transparent"
                    onKeyDown={handleEnterKeyDown}
                    required
                  >
                    <option value="" disabled selected>
                      Select your role
                    </option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Registering...
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
                <button
                  onClick={handleClickLogin}
                  type="button"
                  className="flex-1 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-md text-blue-600 font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
