"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  //   google SignIN
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogins = async () => {
    console.log("working");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={GoogleLogins}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
