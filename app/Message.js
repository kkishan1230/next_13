"use client";

import React from "react";

const Message = ({ children, profilePic, userName, description }) => {
  return (
    <div className="border-b-2 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <div className="w-10">
          <img src={profilePic} className="rounded-full" />
        </div>
        <h2>{userName}</h2>
      </div>
      <div className="py-4">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Message;
