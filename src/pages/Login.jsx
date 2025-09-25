import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [show, setShow] = useState(true);

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

  let handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        toast.success("Login Successful");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        toast.error("Login Error");
      });
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailErr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Email is not valid");
      }
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
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
          toast.success("Log in successful.");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/invalid-credential") {
            toast.error("Invalid user credential");
          }
        });

      setEmail("");
      setPassword("");
    }
  };
  return (
    <>
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
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Login</h1>
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
          Login
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="text-blue-800 font-bold ml-2 border border-blue-800 px-4 py-1.5 text-xs rounded-md cursor-pointer"
        >
          Login with Google
        </button>
        <p className="text-xs">
          Don't have an account?{" "}
          <Link to="/signin" className="text-blue-800">
            Sign In
          </Link>
        </p>
        <p className="text-xs text-blue-800">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
