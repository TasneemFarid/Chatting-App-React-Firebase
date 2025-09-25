import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  const auth = getAuth();
  let [email, setEmail] = useState("");
  let [emailErr, setEmailErr] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  let handleReset = () => {
    if (!email) {
      setEmailErr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Email is not valid");
      }
    }

    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      sendPasswordResetEmail(auth, email)
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  let handleSubmit = () => {};
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">Forgot Password</h1>

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

      <Link to={"/login"}
        onClick={handleSubmit}
        className="bg-blue-800 text-white px-4 py-1.5 text-xs rounded-md cursor-pointer"
      >
        Back to Login
      </Link>
      <button
        onClick={handleReset}
        className="bg-blue-800 text-white px-4 py-1.5 text-xs rounded-md cursor-pointer ml-2"
      >
        Reset
      </button>
    </div>
  );
};

export default ForgotPassword;
