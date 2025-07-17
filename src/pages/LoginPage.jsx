import { AiOutlineUnlock, AiFillFire } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import useMutateHook from "../utils/useMutateHook";
import { API } from "../API/API";
import { handleEnterKeyDown } from "../components/commonFunctions/HandleEnterInput";

const LoginPage = () => {
  const { mutate, isLoading } =  useMutateHook(
    "/wha",
    "Login Successfull",
    "Login Failed! Please try again"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userData = {
      email: form.email?.value,
      password: form.password?.value,
    };
    const response = await mutate({ url: API.Login, input: userData });
    console.log(response);
  };

 

  const inputWrapper =
    "relative flex items-center gap-3 border-2 border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 mb-6 shadow-lg focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-300 hover:shadow-xl";

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background Vectors */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-16 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500"></div>

        {/* Vector Shapes */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#3b82f6", stopOpacity: 0.1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 0.1 }}
              />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#06b6d4", stopOpacity: 0.1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#3b82f6", stopOpacity: 0.1 }}
              />
            </linearGradient>
          </defs>

          {/* Animated Waves */}
          <path
            d="M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
            fill="url(#grad1)"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;50,0;0,0"
              dur="20s"
              repeatCount="indefinite"
            />
          </path>

          <path
            d="M0,500 Q400,300 800,500 T1200,500 V800 H0 Z"
            fill="url(#grad2)"
            className="animate-pulse delay-1000"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;-30,0;0,0"
              dur="15s"
              repeatCount="indefinite"
            />
          </path>

          {/* Floating Geometric Shapes */}
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="rgba(59, 130, 246, 0.1)"
            className="animate-bounce"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;20,20;0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>

          <polygon
            points="1000,150 1050,200 1000,250 950,200"
            fill="rgba(139, 92, 246, 0.1)"
            className="animate-spin"
            style={{ transformOrigin: "1000px 200px" }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 1000 200;360 1000 200"
              dur="20s"
              repeatCount="indefinite"
            />
          </polygon>

          <rect
            x="200"
            y="600"
            width="60"
            height="60"
            fill="rgba(6, 182, 212, 0.1)"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 230 630;45 230 630;0 230 630"
              dur="12s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-0">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <AiFillFire className="text-orange-500 text-4xl sm:text-5xl drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Grades
              </h1>
            </div>
            <p className="text-gray-300 text-sm sm:text-base">
              Welcome back! Please sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={(e) => handleSubmit(e)} onKeyDown={handleEnterKeyDown}>
            <div className="space-y-6">
              {/* Email Input */}
              <div className={inputWrapper}>
                <MdEmail className="text-gray-600 text-xl flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-500 text-gray-700"
                />
              </div>

              {/* Password Input */}
              <div className={inputWrapper}>
                <AiOutlineUnlock className="text-gray-600 text-xl flex-shrink-0" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-500 text-gray-700"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgotpass"
                  className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors duration-200 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                id="login"
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Sign Up Link */}
              <div className="text-center text-gray-300 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-70"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm opacity-70"></div>
      </div>
    </div>
  );
};

export default LoginPage;
