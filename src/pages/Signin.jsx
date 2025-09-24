import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Signin = () => {
  let [email, setEmail] = useState("");
  let [fullName, setFullName] = useState("");
  let [password, setPassword] = useState("");
  let [show, setShow] = useState(true);

  let [emailErr, setEmailErr] = useState("");
  let [fullNameErr, setFullNameErr] = useState("");
  let [passwordErr, setPasswordErr] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  let handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameErr("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailErr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Email is not valid");
      }
    }
    if (!fullName) {
      setFullNameErr("Full Name is required");
    }
    if (!password) {
      setPasswordErr("Password is required");
    } else {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          password
        )
      ) {
        setPasswordErr(
          "Give min 8 characters with atleast one uppercase, lowercase & special character"
        );
      }
    }
  };

  return (
    <>
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Signin</h1>
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
            onChange={handleFullName}
            type="password"
            placeholder="Enter Full Name"
            className="w-full border border-gray-300 px-4 py-2 text-xs rounded-md focus:outline-0"
          />
          <p className="text-xs text-red-500">{fullNameErr}</p>
        </div>
        <div className="relative">
          <input
            onChange={handlePassword}
            type={show ? "password" : "text"}
            placeholder="Enter Password"
            className="w-full border border-gray-300 px-4 py-2 text-xs rounded-md focus:outline-0"
          />

          {show ? (
            <FaEye
              onClick={() => setShow(!show)}
              className="absolute top-2 right-2 cursor-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShow(!show)}
              className="absolute top-2 right-2 cursor-pointer"
            />
          )}

          <p className="text-xs text-red-500">{passwordErr}</p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-800 text-white px-4 py-1.5 text-xs rounded-md cursor-pointer"
        >
          Login
        </button>
        <p className="text-xs">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800">
            Log In
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signin;
