"use client";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const page = () => {
  const route = useRouter();
  const query = useSearchParams();
  const postId = query.get("id");
  const description = query.get("description");

  const [user, loading] = useAuthState(auth);
  const [post, setPost] = useState({ description: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post.description.length === 0) {
      toast.error("oops description is empty");
      return;
    }

    if (postId) {
      const collectionRef = doc(db, "posts", postId);
      const updatedData = { ...post, postTime: serverTimestamp() };
      await updateDoc(collectionRef, updatedData);
      setPost({ ...post, description: "" });
      route.push("/");
    }
    if (!postId) {
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        postTime: serverTimestamp(),
        userId: user.uid,
        profilePic: user.photoURL,
        userName: user.displayName,
      });
      setPost({ ...post, description: "" });
      route.push("/");
    }
  };
  const handleChange = (e) => {
    setPost({ ...post, description: e.target.value });
  };

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <ToastContainer
        position="top-center"
        type="warning"
        theme="dark"
        autoClose={2000}
        limit={1}
      />
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">
          {postId ? "Update Your Post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
            onChange={handleChange}
            maxLength="300"
            defaultValue={postId ? description : ""}
          ></textarea>
          <p
            className={`${
              post.description.length < 295 ? "text-cyan-600" : "text-red-600"
            } font-medium text-sm`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
