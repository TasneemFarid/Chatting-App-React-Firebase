import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Signin = () => {
  const auth = getAuth();
  let navigate = useNavigate();
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
    if (
      email &&
      fullName &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Sign up successful. Please verify email.");
          sendEmailVerification(auth.currentUser);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
          setEmail("");
          setFullName("");
          setPassword("");
        })
        .catch((error) => {
          console.log(error);
          if (error.message.includes("auth/email-already-in-use")) {
            setEmail("");
            setFullName("");
            setPassword("");
            toast.error("Email already in use");
          }
        });
    }
  };

  return (
    <>
      <div className="space-y-3">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition={Bounce}
        />
        <h1 className="text-3xl font-bold">Signin</h1>
        <div>
          <input
            value={email}
            onChange={handleEmail}
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 px-4 py-2 text-xs rounded-md focus:outline-0"
          />
          <p className="text-xs text-red-500">{emailErr}</p>
        </div>
        <div>
          <input
            value={fullName}
            onChange={handleFullName}
            type="text"
            placeholder="Enter Full Name"
            className="w-full border border-gray-300 px-4 py-2 text-xs rounded-md focus:outline-0"
          />
          <p className="text-xs text-red-500">{fullNameErr}</p>
        </div>
        <div className="relative">
          <input
            value={password}
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
          Signin
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
