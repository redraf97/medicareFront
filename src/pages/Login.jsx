import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  /*const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };*/

  const [identifier, setName] = useState("");
  const [password, setPassword] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const loginButton = async () => {
    try {
      axios
        .post("http://localhost:3000/login", {
          identifier,
          password,
        })
        .then(async (response) => {
          if (response.status === 200) {
            //const message = response.data.message
            const token = response.data.token;
            localStorage.setItem("token", token);

            axios
              .get("http://localhost:3000/doctors/profile", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((responseA) => {
                const nameToProfile = responseA.data.name;
                const emailToProfile = responseA.data.email;
                localStorage.setItem("nameToProfile", nameToProfile);
                localStorage.setItem("emailToProfile", emailToProfile);

                navigate("/Profile");
              })
              .catch((error) => {
                if (error.response)
                  setMessageValue(error.response.data.message);
                console.log(messageValue);
              });
          }
        })
        .catch((error) => {
          //if (error.response) setMessageValue(error.response.data.message)
          //alert(error.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    } catch (error) {
      console.log("degat error", error);
    }
  };

  return (
    /*<div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md: p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 😄
        </h3>
        <form className="py-4 md:py-0" onSubmit={e => {e.preventDefault();}}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter Your name"
              name="text"
              value={identifier}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="mt-7">
          <input value="Login" className="signup-button" onClick={loginButton} />        
          </div>
          <div>
      
    </div>
          <p className="mt-5 text-textColor text-center">
            Don't have an account? <Link to="/GuessingType" className="text-primaryColor font-medium ml-1">Register</Link>
          </p>
          <span>{ messageValue }</span>
        </form>
      </div>*/

    <div className="flex items-center justify-center bg-blur py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={loginButton}>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <div className="rounded-md -space-y-px">
            <div>
              <label htmlFor="identifier" className="sr-only">
                Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setName(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-indigo-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email or Name"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-b-2 border-indigo-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                style={{ zIndex: 20 }}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <HiOutlineEye
                    className="w-8 h-10 text-gray-400 absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                ) : (
                  <HiEyeOff
                    className="w-8 h-10 text-gray-400 absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={loginButton}
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            <a
              href="/ForgotPassword"
              className="font-medium text-blue-500 hover:text-blue-700 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="text-center">
            <Link
              to="/register"
              className="font-medium text-blue-500 hover:text-blue-700 hover:underline"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
