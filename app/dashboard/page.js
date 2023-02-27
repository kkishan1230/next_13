"use client";

import { signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import Message from "../Message";
import { FaPen, FaTrash } from "react-icons/fa";

const page = () => {
  const [user, loading] = useAuthState(auth);
  const [yourPosts, setYourPosts] = useState([]);
  const route = useRouter();
  const hangleLogOut = async () => {
    if (user) {
      auth.signOut();
      route.push("/auth/login");
    }
  };

  //
  const getData = async () => {
    const collectionRef = collection(db, "posts");
    if (user) {
      const q = query(collectionRef, where("userName", "==", user.displayName));
      onSnapshot(q, (snapshot) => {
        let posts = [];
        snapshot.docs.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setYourPosts(posts);
      });
    }
  };

  const delDoc = async (post) => {
    const collectionRef = doc(db, "posts", post.id);
    await deleteDoc(collectionRef);
  };
  //
  useEffect(() => {
    getData();
  }, [user]);

  return (
    <div>
      <div>Your Posts</div>
      <div className="flex flex-col mt-8 gap-5">
        {yourPosts.map((post) => (
          <Message key={post.id} {...post}>
            <div>
              {post.comments?.length > 0 ? post.comments?.length : 0} comments
            </div>
            <div className="flex gap-5 my-5 items-center">
              <FaTrash
                onClick={() => delDoc(post)}
                fill="#E90064"
                className="cursor-pointer w-[40px] h-[40px] p-2 rounded-full hover:bg-gray-50 hover:border-solid hover:border-[2px]"
              />
              <Link href={{ pathname: "/post", query: post }}>
                <FaPen
                  fill="#205E61"
                  className="cursor-pointer w-[40px] h-[40px] p-2 rounded-full hover:bg-gray-50 hover:border-solid hover:border-[2px]"
                />
              </Link>
            </div>
          </Message>
        ))}
      </div>
      <div className="cursor-pointer mt-8" onClick={hangleLogOut}>
        SignOut
      </div>
    </div>
  );
};

export default page;
