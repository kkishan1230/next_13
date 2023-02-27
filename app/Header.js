"use client";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";

const Header = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const handleLogin = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <nav className="flex justify-between items-center py-10  px-4 max-w-[1200px] mx-auto">
      <Link href="/">
        <button className="text-lg font-poppins font-medium">
          Creative Minds
        </button>
      </Link>
      <ul className="flex items-center gap-[20px]">
        <Link href={"/post"}>
          <div className="bg-gray-800 px-4 py-2 text-white">POST</div>
        </Link>
        {user && (
          <Link href={"/dashboard"}>
            <img
              src={user.photoURL}
              referrerPolicy="no-referrer"
              alt=""
              className="rounded-full w-[35px]"
            />
          </Link>
        )}
        {!user && (
          <Link href="/auth/login">
            <div className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium">
              LogIn Now
            </div>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Header;
