import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [emailErr, setEmailErr] = useState("");
  let [passwordErr, setPasswordErr] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailErr("Email is required");
    }
    if (!password) {
      setPasswordErr("Password is required");
    }
  };
  return (
    <>
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Login</h1>
        <div>
          <input
            onChange={handleEmail}
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 px-4 py-2 text-xs rounded-md focus:outline-0"
          />
          <p className="text-xs text-red-500">{emailErr}</p>
        </div>
        <div>
          <input
            onChange={handlePassword}
            type="password"
            placeholder="Enter Password"
            className="w-full border border-gray-300 px-4 py-2 text-xs rounded-md focus:outline-0"
          />
          <p className="text-xs text-red-500">{passwordErr}</p>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-800 text-white px-4 py-1.5 text-xs rounded-md cursor-pointer"
        >
          Login
        </button>
        <p className="text-xs">
          Don't have an account?{" "}
          <Link to="/signin" className="text-blue-800">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
