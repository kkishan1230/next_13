"use client";

import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase/config";
import "./globals.css";
import Message from "./Message";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [user, loading] = useAuthState(auth);
  const getData = async () => {
    // const collectionRef = collection(db, "posts");
    // const snapshots = await getDocs(collectionRef);
    // const docs = snapshots.docs.map((data) => data.data());
    // setAllPosts(docs);
    // console.log(docs);
    const colRef = collection(db, "posts");
    getDocs(colRef).then((snapshot) => {
      let fetchedPosts = [];
      snapshot.docs.forEach((doc) => {
        fetchedPosts.push({ ...doc.data(), id: doc.id });
      });
      setAllPosts(fetchedPosts);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  if (user) {
    return (
      <div className="my-12 text-lg font-medium">
        <h2>See what other people are saying</h2>
        <div className="flex flex-col gap-10 mt-10">
          {allPosts.map((post) => (
            <Message key={post.id} {...post}>
              <Link href={{ pathname: `/comments/${post.id}`, query: post }}>
                <button>
                  {post.comments?.length > 0 ? post.comments?.length : 0}{" "}
                  comments
                </button>
              </Link>
            </Message>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Login To see Contents</div>;
  }
}
