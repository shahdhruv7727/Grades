import { AiOutlineUnlock, AiFillFire } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import useMutateHook from "../utils/useMutateHook";
import { API } from "../API/API";
import { handleEnterKeyDown } from "../components/commonFunctions/HandleEnterInput";
// import { ReactComponent as Logo } from "../assets/assets/";

const LoginPage = () => {
  const { mutate, isLoading } = useMutateHook(
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
    "relative flex items-center gap-3 border border-gray-300 bg-white rounded-lg px-4 py-3 mb-6 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#99C0FF] px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
             {/* /*<Logo className="h-12 w-auto mx-auto" />  */}
             <img src="src\assets\GRADES.svg" alt="Logo" className="h-8 w-auto mx-auto" draggable = "false" />
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              Welcome back! Please sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} onKeyDown={handleEnterKeyDown}>
            <div className="space-y-6">
              {/* Email Input */}
              <div className={inputWrapper}>
                <MdEmail className="text-gray-500 text-xl flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400 text-gray-700"
                />
              </div>

              {/* Password Input */}
              <div className={inputWrapper}>
                <AiOutlineUnlock className="text-gray-500 text-xl flex-shrink-0" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400 text-gray-700"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgotpass"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-150 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                id="login"
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ${
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
              <div className="text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-150 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;