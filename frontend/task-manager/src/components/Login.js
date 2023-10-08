import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div>
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
                      id="employee_id"
                      name="employee_id"
                      type="text"
                      className="userInputField"
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
      </div>
    </>
  );
}

export default Login;
