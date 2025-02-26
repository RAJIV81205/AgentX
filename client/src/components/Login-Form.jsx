import { FaGoogle  , FaGithub} from "react-icons/fa";

export function LoginForm({ setSignup }) {

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      
      <h3 className="text-center text-xl font-semibold mb-4 font-poppins ">Welcome back</h3>
      <p className="text-center text-gray-500 mb-6 font-poppins font-medium">
        Login with your Github or Google account
      </p>
      <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-4 font-poppins font-semibold hover:bg-gray-200 cursor-pointer">
      <FaGithub  className="mx-2.5"/> Login with Github
      </button>
      <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-4 font-poppins font-semibold hover:bg-gray-200 cursor-pointer">
        <FaGoogle className="mx-2.5"/> Login with Google
      </button>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 font-poppins font-medium">Or continue with</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-poppins font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-poppins font-medium"
            id="email"
            type="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-poppins font-medium" htmlFor="password">
              Password
            </label>
            <a className="text-sm text-gray-500 font-poppins font-medium" href="#">
              Forgot your password?
            </a>
          </div>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-poppins font-medium"
            id="password"
            type="password"
            placeholder="--------"
          />
        </div>
        <button
          className="w-full bg-black text-white rounded-lg py-2 font-poppins font-semibold cursor-pointer hover:bg-gray-800 transition-all duration-300"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-500 mt-6 font-poppins font-medium " >
        Don't have an account?{" "}
        <button className="text-black font-poppins font-semibold cursor-pointer hover:underline transition-all duration-300" onClick={() => setSignup(true)}>
          Sign up
        </button>
      </p>
    </div>
  );
}
