import { AiOutlineUnlock, AiFillFire } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import useMutateHook from "../utils/useMutateHook";
import { API } from "../API/API";

const LoginPage = () => {
  const { mutate, isLoading } = useMutateHook(
    "/login",
    "Login Successfull",
    "Login Failed! Please try again"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userData = {
      email: form.email.value,
      password: form.password.value,
    };
    mutate({ url: API.Login, input: userData });
  };

  const inputWrapper =
    "flex items-center gap-3 border border-gray-300 bg-white rounded-md px-4 py-3 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500";

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white px-10 py-12 rounded-none shadow-none sm:rounded-xl sm:shadow-xl sm:w-[480px]"
      >
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 mb-8">
          <AiFillFire className="text-orange-500" />
          <h1>Login to Grades</h1>
        </div>

        <div className={inputWrapper}>
          <MdEmail className="text-gray-500 text-lg" />
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
        <div className={inputWrapper}>
          <AiOutlineUnlock className="text-gray-500 text-lg" />
          <input
            type="password"
            name="password"
            required
            placeholder="Enter password"
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
        <div className="w-full text-left mb-2 text-blue-600">
          <Link to="/forgotpass">Forgot Password?</Link>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-300"
          >
            Login
          </button>
        </div>
        <div className="mt-2">
          Don't have an Account?
          <Link to="/register" className="px-1 text-blue-600">
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
