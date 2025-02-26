import { FaGoogle, FaGithub } from "react-icons/fa";

function SignupForm({ setSignup }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[375px]">
      <h3 className="text-center text-lg font-semibold mb-3 font-poppins">Create an account</h3>
      <p className="text-center text-gray-500 mb-5 text-sm font-poppins font-medium">
        Sign up with your Github or Google account
      </p>
      <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-3 text-sm font-poppins font-semibold hover:bg-gray-200 cursor-pointer">
        <FaGithub className="mr-2" /> Sign up with Github
      </button>
      <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-3 text-sm font-poppins font-semibold hover:bg-gray-200 cursor-pointer">
        <FaGoogle className="mr-2" /> Sign up with Google
      </button>
      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm font-poppins font-medium">Or continue with</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-poppins font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm font-poppins font-medium"
            id="name"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-poppins font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm font-poppins font-medium"
            id="email"
            type="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-poppins font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm font-poppins font-medium"
            id="password"
            type="password"
            placeholder="••••••••"
          />
        </div>
        <button
          className="w-full bg-black text-white rounded-lg py-2 text-sm font-poppins font-semibold cursor-pointer hover:bg-gray-800 transition-all duration-300"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-500 text-sm mt-4 font-poppins font-medium">
        Already have an account? {" "}
        <button className="text-black font-semibold cursor-pointer hover:underline transition-all duration-300" onClick={() => setSignup(false)}>
          Log in
        </button>
      </p>
    </div>
  );
}

export default SignupForm
