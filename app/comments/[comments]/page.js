"use client";

import { auth, db } from "@/app/firebase/config";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const query = useSearchParams();
  const postId = query.get("id");
  const userImg = query.get("profilePic");
  const description = query.get("description");
  const userName = query.get("userName");

  const submitMessage = async () => {
    if (!user) {
      route.push("/auth/login");
      return;
    }
    if (!message) {
      toast.error("empty message");
      return;
    }
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        profilePic: user.photoURL,
        userName: user.displayName,
        time: Timestamp.now(),
      }),
    });
    getComments();
    setMessage("");
  };

  const getComments = async () => {
    const docRef = doc(db, "posts", postId);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessage(snapshot.data().comments);
    });
  };

  useEffect(() => {
    if (!user) {
      route.push("/auth/login");
    }
    getComments();
  }, [user]);

  return (
    <div className="border-b-2 rounded-lg p-4">
      <ToastContainer
        position="top-center"
        type="warning"
        theme="dark"
        autoClose={2000}
        limit={1}
      />
      <div className="flex items-center gap-2">
        <div className="w-10">
          <img src={userImg} className="rounded-full" />
        </div>
        <h2>{userName}</h2>
      </div>
      <div className="py-4">
        <p>{description}</p>
      </div>
      <div className="flex">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          value={message}
          placeholder="Send a message 😀"
          className="bg-gray-800 w-full p-2 text-white text-sm"
        />
        <button
          onClick={submitMessage}
          className="bg-cyan-500 text-white py-2 px-4 text-sm"
        >
          Submit
        </button>
      </div>
      <div className="py-6">
        <h2 className="font-bold">Comments</h2>
        {allMessage?.map((message) => (
          <div className="bg-white p-4 my-4 border-2" key={message.time}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 ">
                <img className="rounded-full" src={message.profilePic} alt="" />
              </div>
              <h2>{message.userName}</h2>
            </div>
            <h2>{message.message}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
