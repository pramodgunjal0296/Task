import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPermContactCalendar } from "react-icons/md";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginRequest } from "../redux/action/authAction";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState("");

  // Login
  const logIn = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    setFormInput(formdata);
    dispatch(loginRequest({ formInput, callback: () => navigate("/task") }));
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
      />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Task Manager
          </div>
          <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
            <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
              T
            </span>
            <span> Login To Your Account</span>
          </button>
          <div className="relative mt-10 h-px bg-gray-300">
            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2"></div>
          </div>
          <div className="mt-10">
            <form onSubmit={(e) => logIn(e)}>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  EmployeeID:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <MdPermContactCalendar />
                  </div>

                  <input
                    id="employee_id"
                    name="employee_id"
                    type="text"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Employee ID"
                    required
                  />
                </div>
              </div>
              <div classname="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <div className="flex w-full mt-10">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Login</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div>
        <form onSubmit={(e) => logIn(e)}>
          <div className="FullLoginContainer">
            <div className="loginContainer">
              <div className="loginDetailsContainer">
                <div className="loginDetails">
                  <h1 className="reworkHeading">Tracking Manager</h1>
                  <h1 className="loginHeading">Login</h1>
                  <div className="inputContainer">
                    <label htmlFor="userInput" className="userName">
                      Employee ID
                    </label>
                    <input
                      className="userInputField"
                      id="employee_id"
                      name="employee_id"
                      type="text"
                      placeholder="Enter EmployeeID"
                      required
                    />
                  </div>
                  <div className="inputContainer">
                    <label htmlFor="password" className="password">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      id="password"
                      className="userInputField"
                      placeholder="Enter Password"
                    />
                  </div>
                  <h1 className="forgotPassword">Forgot Password ?</h1>
                  <button className="submitButton">Login</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div> */}
    </>
  );
}

export default Login;
